const Joi = require("@hapi/joi");

exports.schema = Joi.object({
  CNPJ_Gestor: Joi.string()
    .length(14)
    .custom((value, helpers) => {
      if (value.replace(/[^0-9]/g, "").length != 14) {
        return helpers.message("CNPJ inválido");
      }
      return value;
    }, "Validar CNPJ")
    .required(),

  CNPJ_Contribuinte: Joi.string()
    .length(14)
    .custom((value, helpers) => {
      if (value.replace(/[^0-9]/g, "").length != 14) {
        return helpers.message("CNPJ inválido");
      }
      return value;
    }, "Validar CNPJ"),
});
