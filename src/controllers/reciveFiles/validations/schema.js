const Joi = require("@hapi/joi");

exports.schema = Joi.object({
  file: Joi.string().required(),
});
