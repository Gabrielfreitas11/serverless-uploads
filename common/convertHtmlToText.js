import { load } from 'cheerio';

export function convertHtmlToText(html) {
  return load(html);
}
