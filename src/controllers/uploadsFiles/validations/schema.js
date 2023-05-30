const Joi = require("@hapi/joi");

exports.schema = Joi.object({
  type: Joi.string().valid("zip", "xml", "csv", "pva").required(),
  fileKey: Joi.string().required(),
});
