const { HttpResponse } = require("@impostograma/common");

const { isValidParams } = require("./validations/validator");

const { filterFilesByTag } = require("./functions/filterFilesByTag");

module.exports = async ({ body }) => {
  try {
    const params = isValidParams(JSON.parse(body));

    if (params.error) {
      return HttpResponse.badRequest({
        message: params.message,
      });
    }

    const file = await filterFilesByTag(params.value);

    return HttpResponse.ok({
      file,
    });
  } catch (error) {
    // console.log(error);

    return HttpResponse.serverError({
      message: error?.message || "Problemas ao gerar arquivo",
    });
  }
};
