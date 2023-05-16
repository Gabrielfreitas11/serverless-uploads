const { openSession } = require("./functions/openSession");

const { isValidParams } = require("./validations/validator");

const { HttpResponse } = require("@impostograma/common");

module.exports = async ({ body }) => {
  try {
    const params = isValidParams(JSON.parse(body));

    if (params.error) {
      return HttpResponse.badRequest({
        message: params.message,
      });
    }

    const { nfe, cnpj, type } = params.value;

    await openSession(nfe, cnpj, type.toLowerCase());

    return HttpResponse.ok({
      message: "OK",
    });
  } catch (error) {
    console.log(error);
    return HttpResponse.serverError({
      error: error?.message,
      message: "Ocorreu um erro ao localizar o produto",
    });
  }
};
