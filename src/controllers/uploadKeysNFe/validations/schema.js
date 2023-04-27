const Joi = require("@hapi/joi");

exports.schema = Joi.object({
  type: Joi.string().valid("file", "array").required(),
  formData: Joi.when("type", { is: "file", then: Joi.string().required() }),
  cnpj: Joi.string()
    .length(14)
    .custom((value, helpers) => {
      if (value.replace(/[^0-9]/g, "").length != 14) {
        return helpers.message("CNPJ inválido");
      }
      return value;
    }, "Validar CNPJ")
    .required(),
  keys: Joi.when("type", {
    is: "array",
    then: Joi.array().items(Joi.string()).required(),
  }),
});
