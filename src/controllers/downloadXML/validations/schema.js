const Joi = require('@hapi/joi');

exports.schema = Joi.object({
  url: Joi.string().required(),
  key: Joi.string().required(),
  cnpj: Joi.string().required(),
});
