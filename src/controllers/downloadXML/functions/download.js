const axios = require('axios');

const { mssql } = require('../../../../common/mssql');

const { getCert } = require('./getCert');

const addMissingParameterInUrl = (url) => {
  if (!url.includes('&lp=')) {
    url
      += '&lp=L0l4L0hGSE1LMUtGeEJ5elpwTXNYeHRxOEx1RTA2SjhJMkludFZmZ0hvMFJITzBtaEdLK2YvbEFRYXFULzJJTlJyODhQNFVKakNDWTNhWm44NlpwNm9Ddkp2NTdiK3ZhQWFqSTdYQWJzN3M90';
  }

  return url;
};

exports.download = async ({ url, key, cnpj }) => {
  const { httpsAgent, httpAgent } = await getCert(cnpj, key);

  const instance = axios.create({
    httpsAgent,
    httpAgent,
  });

  url = addMissingParameterInUrl(url);

  try {
    const xml = await instance({
      url,
      method: 'GET',
      maxRedirects: 1,
      responseType: 'text/xml',
    });

    if (!xml.data) {
      throw new Error('Não foi possível gerar o XML');
    }

    if (xml.data?.includes('html')) {
      throw new Error('Não foi possível gerar o XML');
    }

    const buffer = Buffer.from(xml.data, 'utf-8');

    return buffer;
  } catch (error) {
    mssql.update(5, key);
    console.log(error);
  }
};
