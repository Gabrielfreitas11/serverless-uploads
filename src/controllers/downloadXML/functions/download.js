const axios = require("axios");

const mssql = require("../../../../common/mssql");

const { getCert } = require("./getCert");

const { getCacheInfo } = require("./getCacheInfo");

const addMissingParameterInUrl = async (url, cnpj) => {
  const lp = url.split("&lp=");

  const data = await getCacheInfo(cnpj, { lp: lp[1] });

  if (!data) {
    await mssql.update(1, key);
    throw new Error("Não foi possível gerar o XML");
  }

  if (!url.includes("&lp=")) {
    url += `&lp=${data.lp}`;
  }

  return url;
};

exports.download = async ({ url, key, cnpj }) => {
  const { httpsAgent, httpAgent } = await getCert(cnpj, key);

  const instance = axios.create({
    httpsAgent,
    httpAgent,
  });

  url = await addMissingParameterInUrl(url, cnpj);

  if (!url) {
    return null;
  }

  try {
    const xml = await instance({
      url,
      method: "GET",
      maxRedirects: 1,
      responseType: "text/xml",
    });

    if (!xml.data || xml.data?.includes("html")) {
      throw new Error("Não foi possível gerar o XML");
    }

    const buffer = Buffer.from(xml.data, "utf-8");

    return buffer;
  } catch (error) {
    await mssql.update(5, key);
    console.log(error);
    throw error;
  }
};
