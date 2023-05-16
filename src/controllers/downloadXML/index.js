const { HttpResponse } = require("@impostograma/common");

const { isValidParams } = require("./validations/validator");

const { download } = require("./functions/download");
const { sendFileToPath } = require("./functions/sendFileToPath");

module.exports = async ({ body }) => {
  try {
    const params = isValidParams(JSON.parse(body));

    if (params.error) {
      return HttpResponse.badRequest({
        message: params.message,
      });
    }

    const fileBuffer = await download(params.value);

    if (!fileBuffer) {
      return HttpResponse.badRequest({
        message: "Problemas ao gerar arquivo",
      });
    }

    await sendFileToPath(fileBuffer, params.value.key);

    return HttpResponse.ok({
      message: "Arquivo gerado com sucesso",
    });
  } catch (error) {
    console.log(error.message);
    return HttpResponse.serverError({
      message: "Ocorreu um erro ao gerar o arquivo",
    });
  }
};
