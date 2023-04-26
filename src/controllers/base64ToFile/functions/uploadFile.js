import S3 from '../../../../common/aws/s3';

const s3Access = S3();

export async function uploadFile({
  fileName, client, ano, mes, base64, fileType,
}) {
  const params = {
    bucket: 'emalote',
    caption: `${client}/${ano}/${mes}/${fileName}.${fileType}`,
    contentType: `application/${fileType}`,
    contentDisposition: 'inline',
    buffer: Buffer.from(base64, 'base64'),
  };

  const upload = await s3Access.sendFile(params);

  return upload && upload.Location ? upload.Location : '';
}
