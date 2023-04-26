import Joi from '@hapi/joi';

export const schema = Joi.object({
  product: Joi.string().required(),
});
