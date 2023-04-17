import { request } from '../../../common/http';

import { convertHtmlToText } from '../../../common/convertHtmlToText';

export async function chatGPT(content, attempts = 0) {
  try {
    const options = {
      url: `https://pt.product-search.net/?q=${content}`,
      method: 'GET',
    };

    const response = await request(options);

    const $ = convertHtmlToText(response.data);

    const infoProducts = $('p').text().split('EAN');

    // console.log(infoProducts);
    let product = '';

    infoProducts.forEach((el) => {
      if (el.includes(content)) {
        product = el.replace(content, '');
      }
    });

    return product;
  } catch (e) {
    console.log(e);
    const $ = convertHtmlToText(e?.response?.data);

    if ($('title').text().includes('403') && attempts < 2) {
      // await chatGPT(content, attempts + 1);
    }

    throw null;
  }
}
