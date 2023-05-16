const { HttpResponse } = require("@impostograma/common");

const { isValidParams } = require("./validations/validator");

const { formatStatus } = require("./functions/formatStatus");

module.exports = async ({ headers, queryStringParameters }) => {
  try {
    const params = isValidParams({
      CNPJ_Gestor: headers?.CNPJ_Gestor || headers?.cnpj_gestor,
      ...queryStringParameters,
    });

    if (params.error) {
      return HttpResponse.badRequest({
        message: params.message,
      });
    }

    const result = await formatStatus(params.value);

    if (!result) {
      return HttpResponse.badRequest({
        message: "Não foi possível resgatar o status do upload",
      });
    }

    return HttpResponse.ok(result);
  } catch (error) {
    console.log(error);
    return HttpResponse.serverError({
      error: error?.message,
      message: "Ocorreu um erro ao resgatar o status do upload",
    });
  }
};
