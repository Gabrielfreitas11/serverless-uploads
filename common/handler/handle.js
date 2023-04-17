import BaseController from './BaseController';

export default async (event, context, func, funcName) => {
  const Controller = class extends BaseController {};
  const handler = new Controller();
  handler[funcName] = func;
  return handler.handle(event, context, funcName);
};
