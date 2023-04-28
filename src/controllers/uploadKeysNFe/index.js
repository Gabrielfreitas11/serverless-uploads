const HttpResponse = require("../../../common/httpResponse");

const { isValidParams } = require("./validations/validator");

const { getKeysFromBase64 } = require("./functions/getKeysFromBase64");

const { sendKeysToBase } = require("./functions/sendKeysToBase");

module.exports = async ({ body, headers }) => {
  try {
    const params = isValidParams({
      ...JSON.parse(body),
      cnpj: headers?.cnpj,
      type: headers?.type,
    });

    if (params.error) {
      return HttpResponse.badRequest({
        message: params.message,
      });
    }

    let { type, keys, formData, cnpj, boundary } = params.value;

    if (type == "file") {
      keys = await getKeysFromBase64(formData, boundary);

      if (!keys) {
        return HttpResponse.badRequest({
          message: "Não foi possível realizar o upload das chaves",
        });
      }
    }
    const result = await sendKeysToBase(keys, cnpj);

    if (!result) {
      return HttpResponse.badRequest({
        message: "Não foi possível realizar o upload das chaves",
      });
    }

    return HttpResponse.ok({
      message: "Chaves inseridas no banco com sucesso",
    });
  } catch (error) {
    console.log(error);
    return HttpResponse.serverError({
      error: error?.message,
      message: "Ocorreu um erro ao realizar o upload das chaves",
    });
  }
};
