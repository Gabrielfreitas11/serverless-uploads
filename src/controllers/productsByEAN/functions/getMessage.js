import { chatGPT } from '../../../clients/chatGPT';

import { fetchBrowser } from '../../../clients/fetchBrowser';

export async function getMessage({ product }) {
  const response = await fetchBrowser(product);

  // const message = await chatGPT(product, EAN);

  return response;
}
