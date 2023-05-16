const { HttpResponse } = require("@impostograma/common");

const { isValidParams } = require('./validations/validator');

const { uploadFile } = require('./functions/uploadFile');

module.exports = async ({ body }) => {
  try {
    const params = isValidParams(JSON.parse(body));

    if (params.error) {
      return HttpResponse.badRequest({
        message: params.message,
      });
    }

    const file = await uploadFile(params.value);

    return HttpResponse.ok({
      file,
    });
  } catch (error) {
    // console.log(error);

    return HttpResponse.serverError({
      message: error?.message || 'Problemas ao gerar arquivo',
    });
  }
};
