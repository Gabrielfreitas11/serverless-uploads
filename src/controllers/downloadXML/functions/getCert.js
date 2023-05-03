const { CookieJar } = require("tough-cookie");

const { HttpsCookieAgent, HttpCookieAgent } = require("http-cookie-agent/http");
const { decrypt } = require("../../../../common/cryptography");

const mssql = require("../../../../common/mssql");

exports.getCert = async (cnpj, key) => {
  const certDB = await mssql.getCert(cnpj);

  if (!certDB || certDB?.length === 0) {
    await mssql.update(4, key);
    throw new Error(
      "Não foi localizado nunenhum certificado com esse cnpj: ",
      cnpj
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
};
