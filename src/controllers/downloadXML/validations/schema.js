import Joi from '@hapi/joi';

export const schema = Joi.object({
  url: Joi.string().required(),
  key: Joi.string().required(),
  cnpj: Joi.string().required(),
});
