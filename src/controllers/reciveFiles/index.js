const HttpResponse = require("../../../common/httpResponse");

const { isValidParams } = require("./validations/validator");

const { descompactFile } = require("./functions/descompactFile");

module.exports = async () => {
  try {
    await descompactFile(formData);

    return HttpResponse.ok({
      message: formData,
    });
  } catch (error) {
    console.log(error);
    return HttpResponse.serverError({
      error: error?.message,
      message: "Ocorreu um erro ao realizar o upload das chaves",
    });
  }
};
