module.exports = class HttpResponse {
  static ok(body) {
    return {
      statusCode: 200,
      body,
    };
  }

  static created(body) {
    return {
      statusCode: 201,
      body,
    };
  }

  static notFound(body) {
    return {
      statusCode: 404,
      body,
    };
  }

  static badRequest(body) {
    return {
      statusCode: 400,
      body,
    };
  }

  static serverError(body) {
    return {
      statusCode: 500,
      body,
    };
  }
};
