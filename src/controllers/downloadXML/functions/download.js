import axios from 'axios';

import { mssql } from '../../../../common/mssql';

import { getCert } from './getCert';

const addMissingParameterInUrl = (url) => {
  if (!url.includes('&lp=')) {
    url
      += '&lp=L0l4L0hGSE1LMUtGeEJ5elpwTXNYeHRxOEx1RTA2SjhJMkludFZmZ0hvMFJITzBtaEdLK2YvbEFRYXFULzJJTlJyODhQNFVKakNDWTNhWm44NlpwNm9Ddkp2NTdiK3ZhQWFqSTdYQWJzN3M90';
  }

  return url;
};

export async function download({ url, key, cnpj }) {
  const { httpsAgent, httpAgent } = await getCert(cnpj);

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
      mssql.update(1, key);
      throw new Error('Não foi possível gerar o XML');
    }

    const buffer = Buffer.from(xml.data, 'utf-8');

    return buffer;
  } catch (error) {
    console.log(error);
  }
}
