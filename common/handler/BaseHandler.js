class BaseHandler {
  event = null;

  context = null;

  env = process.env;

  async handle(event, context, method, ignoreBaseHandler) {
    this.setFunctionContext(event, context);

    if (ignoreBaseHandler) return this[method](event, context);

    if (!(await this.isAuthorized())) {
      return BaseHandler.httpResponse(
        401,
        JSON.stringify({
          statusCode: 401,
          message: "Unauthorized!",
        })
      );
    }

    try {
      if (JSON.stringify(event?.headers).includes("form-data")) {
        event.body = JSON.stringify({
          formData: event.body,
        });
      }

      this.generateLog({
        payload: {
          body:
            typeof event.body === "string"
              ? JSON.parse(event.body)
              : event.body,
          queryStringParameters: event.queryStringParameters,
        },
      });

      context.callbackWaitsForEmptyEventLoop = false;

      const response = await this[method](event, context);

      const returnFunction = BaseHandler.httpResponse(
        response.statusCode,
        typeof response === "string" ? response : JSON.stringify(response),
        response.headers
      );

      if (response.statusCode !== 200) {
        this.generateLog(returnFunction);
      }

      return returnFunction;
    } catch (err) {
      const message =
        err.response && err.response.data
          ? err.response.data
          : err.message || err;

      const returnFunction = BaseHandler.httpResponse(500, message);

      this.generateLog(returnFunction);

      return returnFunction;
    }
  }

  setFunctionContext(event, context) {
    this.event = event;
    this.context = context;
    process.env.sourceIpAddress =
      event.requestContext &&
      event.requestContext.identity &&
      event.requestContext.identity.sourceIp
        ? event.requestContext.identity.sourceIp
        : null;
  }

  static httpResponse(statusCode, body, headers = {}) {
    return {
      statusCode,
      body,
      headers: {
        "Access-Control-Allow-Origin":
          process.env.stage == "prod"
            ? "https://app.impostograma.com.br"
            : "http://localhost:4200",
        "Access-Control-Allow-Headers":
          "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token, cnpj, type",
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

  // eslint-disable-next-line class-methods-use-this

  generateLog(response) {
    console.log(response);
  }

  authHeaderIsTheSameInTheEnvironment() {
    if (this.event.headers === undefined) {
      return true;
    }

    return (
      this.event.headers.Authorization === this.env.authToken ||
      this.event.headers.authorization === this.env.authToken
    );
  }
}

module.exports = BaseHandler;
