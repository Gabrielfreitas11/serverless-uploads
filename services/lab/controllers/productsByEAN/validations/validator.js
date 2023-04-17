import { schema } from './schema';

export function isValidParams(params) {
  if (!params) {
    return {
      error: true,
      message: 'Faltando parâmetros obrigatórios',
    };
  }

  const result = schema.validate(params);
  if (result.error) {
    return {
      error: true,
      message: `O seguinte parâmetro está faltando ou incorreto: ${result.error.details[0].path[0]}`,
    };
  }

  return {
    value: result.value,
    error: false,
  };
}
