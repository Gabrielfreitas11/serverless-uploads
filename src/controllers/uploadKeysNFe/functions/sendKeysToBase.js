const mssql = require("../../../../common/mssql");

const formatPayloadToDBValues = (keys, cnpj) => {
  return keys.map((key) => `('${cnpj}', '${key}', '1')`).join(", ");
};

exports.sendKeysToBase = async (keys, cnpj) => {
  try {
    const data = formatPayloadToDBValues(keys, cnpj);

    const result = await mssql.insert(data);

    return result;
  } catch (error) {
    throw new Error(error?.message);
  }
};
