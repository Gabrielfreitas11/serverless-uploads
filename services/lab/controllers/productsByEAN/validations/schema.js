import Joi from '@hapi/joi';

export const schema = Joi.object({
  EAN: Joi.string().required(),
});
