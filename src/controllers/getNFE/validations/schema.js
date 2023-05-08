const Joi = require("@hapi/joi");

exports.schema = Joi.object({
  nfe: Joi.string().required(),
  cnpj: Joi.string().required(),
  type: Joi.string().required(),
});
