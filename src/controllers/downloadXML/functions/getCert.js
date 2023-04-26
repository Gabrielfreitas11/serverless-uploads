import { CookieJar } from 'tough-cookie';

import { HttpsCookieAgent, HttpCookieAgent } from 'http-cookie-agent/http';
import { decrypt } from '../../../../common/cryptography';

import { mssql } from '../../../../common/mssql';

export async function getCert(cnpj, key) {
  const certDB = await mssql.getCert(cnpj);

  if (!certDB || certDB?.length === 0) {
    mssql.update(4, key);
    throw new Error(
      'Não foi localizado nunenhum certificado com esse cnpj: ',
      cnpj,
    );
  }

  const pass = decrypt(certDB[0].Senha);

  const jar = new CookieJar();

  const httpsAgent = new HttpsCookieAgent({
    cookies: { jar },
    pfx: certDB[0].RawData,
    passphrase: pass,
  });

  const httpAgent = new HttpCookieAgent({
    cookies: { jar },
  });

  return { httpsAgent, httpAgent };
}
