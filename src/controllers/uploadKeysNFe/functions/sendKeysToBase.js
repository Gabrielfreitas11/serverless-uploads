const mssql = require("../../../../common/mssql");

const formatPayloadToDBValues = (keys, cnpj) => {
  return keys
    .map((key) => {
      const codigoModelo = key.substr(20, 2);

      const type = codigoModelo == 55 ? "nfe" : "cte";

      return `('${cnpj}', '${key}', '1', '${type}')`;
    })
    .join(", ");
};

exports.sendKeysToBase = async (keys, cnpj) => {
  try {
    const data = formatPayloadToDBValues(keys, cnpj);

    const result = await mssql.insert(data, cnpj);

    return result;
  } catch (error) {
    throw new Error(error?.message);
  }
};
