import axios from 'axios';

import FormData from 'form-data';

import { mssql } from '../../../../common/mssql';

export async function sendFileToPath(fileBuffer, key) {
  try {
    const formData = new FormData();

    formData.append('file', fileBuffer, {
      filename: `${key}.xml`,
    });

    const options = {
      url: `${process.env.BASE_URL_IG}/Arquivo/Upload`,
      method: 'POST',
      data: formData,
      headers: {
        ...formData.getHeaders(),
        Authorization: `Bearer ${process.env.AUTH_IG}`,
      },
      cache: false,
    };

    const { data } = await axios(options);

    if (!data?.resultado) {
      throw new Error('Não foi possível salvar o arquivo na pasta');
    }

    mssql.update(3, key);

    return data;
  } catch (error) {
    console.log(error);
    mssql.update(1, key);
    throw new Error(error?.message);
  }
}
