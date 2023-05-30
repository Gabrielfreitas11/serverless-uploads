const { getFileStorage } = require("../getFileStorage");

const AdmZip = require("adm-zip");

const { uploadFileStorage } = require("../uploadFileStorage");

exports.readXml = async ({ fileKey, type }) => {
  const zipBuffer = await getFileStorage(`${type}/${fileKey}`);

  if (!zipBuffer) {
    throw new Error("Não foi localizado nenhum arquivo");
  }

  const zip = new AdmZip(zipBuffer);

  const zipEntries = zip.getEntries();

  await Promise.allSettled(
    zipEntries.map((zipEntry) => {
      if (!zipEntry.isDirectory) {
        const fileContent = zipEntry.getData();

        const s3Key = `zip/content/${zipEntry.entryName}`;

        const uploadParams = {
          fileName: s3Key,
          buffer: fileContent,
        };

        return uploadFileStorage(uploadParams);
      }
    })
  );
};
