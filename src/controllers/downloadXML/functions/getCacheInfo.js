const s3 = require("../../../../common/aws/s3");

const s3Access = s3();

const { DateTime } = require("luxon");

const { request } = require("../../../../common/http");

const saveCacheInfo = async (cnpj, data) => {
  const caption = `${cnpj}.text`;
  const params = {
    bucket: "crawler-captcha-download",
    caption,
    contentType: "application/txt",
    contentDisposition: "inline",
    buffer: Buffer.from(JSON.stringify(data), "utf-8"),
  };

  const upload = await s3Access.sendFile(params);

  return upload && upload.Location ? upload.Location : "";
};

exports.getCacheInfo = async (cnpj, json) => {
  json.createdAt = DateTime.now().valueOf();
  try {
    const options = {
      url: `https://crawler-captcha-download.s3.sa-east-1.amazonaws.com/${cnpj}.text`,
      method: "GET",
    };

    const { data } = await request(options);

    if (
      DateTime.now().plus({ hours: -3 }).valueOf() > data?.createdAt &&
      json.lp
    ) {
      await saveCacheInfo(cnpj, json);
    }

    return data;
  } catch (error) {
    console.log(json.lp);

    if (!json.lp) {
      return null;
    }

    await saveCacheInfo(cnpj, json);

    return json;
  }
};
