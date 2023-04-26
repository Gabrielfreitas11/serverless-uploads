import Joi from '@hapi/joi';

export const schema = Joi.object({
  base64: Joi.string().required(),
  fileName: Joi.string().required(),
  client: Joi.string().required(),
  ano: Joi.string().required(),
  fileType: Joi.string().default('xml'),
  mes: Joi.string()
    .valid(
      'janeiro',
      'fevereiro',
      'março',
      'abril',
      'maio',
      'junho',
      'julho',
      'agosto',
      'setembro',
      'outubro',
      'novembro',
      'dezembro',
    )
    .required(),
});
