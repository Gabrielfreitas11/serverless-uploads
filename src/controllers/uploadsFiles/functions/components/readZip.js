const { getFileStorage } = require("../getFileStorage");

const AdmZip = require("adm-zip");

const { uploadFileStorage } = require("../uploadFileStorage");

const chunkArray = (array) => {
  const dividedArray = [];

  const chunkSize = 50;

  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    dividedArray.push(chunk);
  }

  // Transforma cada parte em um novo array com dois itens
  return dividedArray.map((chunk) => {
    const newArray = [];
    for (let i = 0; i < chunk.length; i += 1) {
      const item1 = chunk[i];

      newArray.push(item1);
    }
    return newArray;
  });
};

exports.readZip = async ({ fileKey, type }) => {
  const zipBuffer = await getFileStorage(`${type}/${fileKey}`);

  if (!zipBuffer) {
    throw new Error("Não foi localizado nenhum arquivo");
  }

  const zip = new AdmZip(zipBuffer);

  const zipEntries = zip.getEntries();

  const zipEntriesSepareted = chunkArray(zipEntries);

  await Promise.allSettled(
    zipEntriesSepareted.map((zipEntries) => {
      return uploadFileStorage(
        zipEntries
          .map((zipEntry) => {
            if (!zipEntry.isDirectory) {
              const fileContent = zipEntry.getData();

              // const s3Key = `zip/content/${zipEntry.entryName}`;

              return fileContent;
            }

            return null;
          })
          .filter((el) => el != null)
      );
    })
  );
};
