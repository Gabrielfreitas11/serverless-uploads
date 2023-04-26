import HttpResponse from '../../../common/httpResponse';

import handleFunction from '../../../common/handler/handle';

import { isValidParams } from './validations/validator';

import { getMessage } from './functions/getMessage';

export const productsByEAN = async ({ body }) => {
  try {
    console.log(body);
    const params = isValidParams(JSON.parse(body));

    if (params.error) {
      return HttpResponse.badRequest({
        message: params.message,
      });
    }

    const message = await getMessage(params.value);

    return HttpResponse.ok({
      message,
    });
  } catch (error) {
    // console.log(error);

    return HttpResponse.serverError({
      message: error?.message || 'Problemas ao consultar mensagem',
    });
  }
};

export const handle = async (event, context) => handleFunction(event, context, productsByEAN, 'productsByEAN');
