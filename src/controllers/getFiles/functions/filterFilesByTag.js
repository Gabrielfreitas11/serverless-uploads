const S3 = require("../../../../common/aws/s3");

const s3Access = S3();

exports.filterFilesByTag = async ({ cnpj }) => {
  const params = {
    bucket: "emalote",
    tag: `cnpj=${cnpj}`,
  };

  const upload = await s3Access.filterFiles(params);

  return upload && upload.Location ? upload.Location : "";
};
