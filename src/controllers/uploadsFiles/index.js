const { HttpResponse, Validator } = require("@impostograma/common");

const { schema } = require("./validations/schema");

const { readZip } = require("./functions/components/readZip");
const { readXml } = require("./functions/components/readXml");
const { readPva } = require("./functions/components/readPva");
const { readCsv } = require("./functions/components/readCsv");

const { errorProcess } = require("./functions/errorProcess");

module.exports = async (event) => {
  try {
    const params = Validator(JSON.parse(event.body), schema);

    if (params.error) {
      return HttpResponse.badRequest({
        message: params.message,
      });
    }

    let { fileKey, type } = params.value;

    switch (type) {
      case "zip":
        await readZip({ fileKey, type });
        break;
      case "xml":
        await readXml({ fileKey, type });
        break;

      case "txt":
        await readPva({ fileKey, type });
        break;

      case "csv":
        await readCsv({ fileKey, type });
        break;

      default:
        throw new Error("File type not allowed");
    }

    return HttpResponse.ok({
      message: "Chaves inseridas no banco com sucesso",
    });
  } catch (error) {
    console.log(error);

    await errorProcess(params.value);

    return HttpResponse.serverError({
      error: error?.message,
      message: "Ocorreu um erro ao realizar o upload das chaves",
    });
  }
};
