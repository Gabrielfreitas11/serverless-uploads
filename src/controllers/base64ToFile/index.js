import HttpResponse from '../../../common/httpResponse';

import { isValidParams } from './validations/validator';

import handleFunction from '../../../common/handler/handle';

import { uploadFile } from './functions/uploadFile';

export const base64ToFile = async ({ body }) => {
  try {
    const params = isValidParams(JSON.parse(body));

    if (params.error) {
      return HttpResponse.badRequest({
        message: params.message,
      });
    }

    const file = await uploadFile(params.value);

    return HttpResponse.ok({
      file,
    });
  } catch (error) {
    // console.log(error);

    return HttpResponse.serverError({
      message: error?.message || 'Problemas ao gerar arquivo',
    });
  }
};

export const handle = async (event, context) => handleFunction(event, context, base64ToFile, 'base64ToFile');
