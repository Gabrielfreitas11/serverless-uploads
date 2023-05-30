const S3 = require("../../../../common/aws/s3");

const s3Access = S3();

exports.getFileStorage = async (fileKey) => {
  const params = {
    bucket: process.env.UPLOAD_IG_BUCKET,
    key: fileKey,
  };

  const object = await s3Access.getContentFile(params);

  return object?.Body;
};
