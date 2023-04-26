/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

const fs = require('fs');
const BaseHandler = require('./BaseHandler');
/**
 * @param {string} controllersPath path to the folder containing the routes
 */
const AutoHandler = (controllersPath, ignoreBaseHandler = false) => {
  class MyHandler extends BaseHandler {}
  const handler = new MyHandler();

  const folders = fs.readdirSync(controllersPath);

  const functionsToExport = {};

  folders.forEach((service) => {
    handler[service] = require(`${controllersPath}/${service}`);
    functionsToExport[service] = (event, context) => {
      const requestPromise = handler.handle(event, context, service, ignoreBaseHandler);

      // add middlewares if needed
      return requestPromise;
    };
  });

  return functionsToExport;
};
module.exports = AutoHandler;
