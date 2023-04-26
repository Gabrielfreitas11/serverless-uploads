// import { request } from "../../common/http";

import { convertHtmlToText } from '../../common/convertHtmlToText';
import { request } from '../../common/http';

const fetchBrowser = async (content, attempts = 0) => {
  try {
    const url = `https://pt.product-search.net/?q=${content}`;

    const options = {
      url,
      method: 'GET',
      headers: {
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin': '*',
      },
    };

    const response = await request(options);

    const $ = convertHtmlToText(response.data);

    console.log($('p').text());
    console.log($('tbody').text());

    const infoProducts = $('p').text().split('EAN');

    // console.log(infoProducts);
    let product = '';

    infoProducts.forEach((el) => {
      if (el.includes(content)) {
        product = el.replace(content, '');
      }
    });

    return product.trim();
  } catch (e) {
    console.log(e);
    // const $ = convertHtmlToText(e?.response?.data);

    // if ($('title').text().includes('403') && attempts < 6) {
    //   console.log(attempts);
    //   await new Promise((resolve) => setTimeout(resolve, 2000));
    //   const product = await fetchBrowser(content, attempts + 1);

    //   return product;
    // }

    throw null;
  }
};

export { fetchBrowser };
