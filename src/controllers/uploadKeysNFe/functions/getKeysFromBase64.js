const { Readable } = require("stream");
const csv = require("csv-parser");

const formatResults = (results) => {
  const formatResults = [];

  const firstKey = Object.keys(results[0])[0];

  const firstKeyIsNFe = firstKey.replace(/[^0-9]/, "").length == 44;

  if (firstKeyIsNFe) {
    formatResults.push(firstKey);
  }

  results.forEach((key) => {
    formatResults.push(key[firstKey]);
  });

  return formatResults;
};

exports.getKeysFromBase64 = async (base64) => {
  try {
    const buffer = Buffer.from(base64, "base64");

    const stream = Readable.from(buffer.toString());
    let results = [];

    await new Promise((resolve, reject) => {
      stream
        .pipe(csv())
        .on("data", (data) => {
          results.push(data);
        })
        .on("finish", () => {
          results = formatResults(results);

          resolve();
        });
    });

    return results;
  } catch (error) {
    console.log(error);
    return null;
  }
};
