export default class BaseController {
  event = null;

  context = null;

  env = process.env;

  async handle(event, context, method, isHttpResponse = true) {
    this.setFunctionContext(event, context);

    if (!(await this.isAuthorized())) {
      return BaseController.httpResponse(
        401,
        JSON.stringify({
          statusCode: 401,
          message: 'Unauthorized!',
        }),
      );
    }

    try {
      const response = await this[method](event);

      if (!isHttpResponse) return response;

      const body = typeof response.body === 'string'
        ? response.body
        : JSON.stringify(response.body);
      return BaseController.httpResponse(
        response.statusCode,
        body,
        response.headers,
      );
    } catch (err) {
      const message = err.response && err.response.data
        ? err.response.data
        : err.message || err;

      return BaseController.httpResponse(500, message);
    }
  }

  setFunctionContext(event, context) {
    this.event = event;
    this.context = context;

    process.env.sourceIpAddress = event.requestContext
      && event.requestContext.identity
      && event.requestContext.identity.sourceIp
      ? event.requestContext.identity.sourceIp
      : null;
  }

  static httpResponse(statusCode, body, headers = {}) {
    return {
      statusCode,
      body,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        ...headers,
      },
    };
  }

  isAuthorized() {
    const checkByAuthMethod = {
      header: this.authHeaderIsTheSameInTheEnvironment(),
    }[this.env.authMethod];

    if (checkByAuthMethod === undefined) {
      return true;
    }

    return checkByAuthMethod;
  }

  authHeaderIsTheSameInTheEnvironment() {
    return this.event.headers.Authorization === this.env.authToken;
  }

  /**
   * @author Victor Hugo Lemos Mattar & Sandrão
   * @param {*} context
   * @returns {string}
   */

  /**
   * @author Will Saymon & Victor Hugo Lemos Mattar
   * @param {*} context
   * @returns {string}
   */
}
