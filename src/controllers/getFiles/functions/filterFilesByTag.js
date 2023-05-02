const S3 = require("../../../../common/aws/s3");

const s3Access = S3();

exports.filterFilesByTag = async ({ cnpj }) => {
  const params = {
    bucket: "emalote",
    key: 'Demo/2023/maio/teste-xml'
  };

  const files = await s3Access.listFiles(params);

  return files;
};
