const HttpResponse = require("../../../common/httpResponse");

const { isValidParams } = require("./validations/validator");

const { formatStatus } = require("./functions/formatStatus");

module.exports = async ({ headers }) => {
  try {
    const params = isValidParams({
      CNPJ_Gestor: headers?.CNPJ_Gestor || headers?.cnpj_gestor,
    });

    if (params.error) {
      return HttpResponse.badRequest({
        message: params.message,
      });
    }

    let { CNPJ_Gestor } = params.value;

    const result = await formatStatus(CNPJ_Gestor);

    if (!result) {
      return HttpResponse.badRequest({
        message: "Não foi possível realizar o upload das chaves",
      });
    }

    return HttpResponse.ok(result);
  } catch (error) {
    console.log(error);
    return HttpResponse.serverError({
      error: error?.message,
      message: "Ocorreu um erro ao realizar o upload das chaves",
    });
  }
};
