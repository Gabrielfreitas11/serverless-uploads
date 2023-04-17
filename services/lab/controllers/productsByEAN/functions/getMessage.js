import { chatGPT } from '../../../clients/chatGPT';

export async function getMessage({ EAN }) {
  const product = await chatGPT(EAN);

  return product?.trim();
}
