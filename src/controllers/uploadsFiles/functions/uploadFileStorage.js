const S3 = require("../../../../common/aws/s3");

const s3Access = S3();

const { uploadFile } = require("../../../clients/ig");

exports.uploadFileStorage = async (buffers) => {
  try {
    const upload = await uploadFile(buffers);

    if (!upload) throw new Error("Problemas ao realizar upload do arquivo");

    return upload;
  } catch (error) {
    // const params = {
    //   bucket: process.env.UPLOAD_IG_BUCKET,
    //   caption: info.fileName,
    //   contentType: `application/xml`,
    //   contentDisposition: "inline",
    //   buffer: info.buffer,
    // };

    // const upload = await s3Access.sendFile(params, null, "public-read");

    // return upload && upload.Location ? upload.Location : "";

    return null;
  }
};
