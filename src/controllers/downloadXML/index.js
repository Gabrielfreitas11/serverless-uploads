import HttpResponse from '../../../common/httpResponse';

import { isValidParams } from './validations/validator';

import handleFunction from '../../../common/handler/handle';

import { download } from './functions/download';

import { sendFileToPath } from './functions/sendFileToPath';

export const downloadXML = async ({ body }) => {
  try {
    const params = isValidParams(JSON.parse(body));

    if (params.error) {
      return HttpResponse.badRequest({
        message: params.message,
      });
    }

    const fileBuffer = await download(params.value);

    if (!fileBuffer) {
      return HttpResponse.badRequest({
        message: 'Problemas ao gerar arquivo',
      });
    }

    const file = await sendFileToPath(fileBuffer, params.value.key);

    return HttpResponse.ok(file);
  } catch (error) {
    console.log(error);
    return HttpResponse.serverError({
      error: error?.message,
      message: 'Ocorreu um erro ao gerar o arquivo',
    });
  }
};

export const handle = async (event, context) => handleFunction(event, context, downloadXML, 'downloadXML');
