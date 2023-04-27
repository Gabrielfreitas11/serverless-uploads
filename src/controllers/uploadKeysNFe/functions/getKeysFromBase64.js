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

exports.getKeysFromBase64 = async (file) => {
  try {
    const splitContent = file.split(" ");

    const content = splitContent[splitContent.length - 1]
      .replace(/-|text\/csv/g, "")
      .trim();

    const keys = content.replace(/\r/g, "").split("\n");

    keys.pop();

    return keys;
  } catch (error) {
    console.log(error);
    return null;
  }
};
