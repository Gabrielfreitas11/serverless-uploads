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
      event = {
        resource: "/uploadKeysNFe",
        path: "/uploadKeysNFe",
        httpMethod: "POST",
        headers: {
          accept: "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
          Authorization: "RRwPrJsGdiwdWZ1CZj9srRtCdQ99LPeg",
          "content-type":
            "multipart/form-data; boundary=----WebKitFormBoundarysHe4EjBGFQHzq81o",
          Host: "o0db8iwsg0.execute-api.sa-east-1.amazonaws.com",
          origin: "http://localhost:4200",
          referer: "http://localhost:4200/",
          "sec-ch-ua":
            '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Windows"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
          "X-Amzn-Trace-Id": "Root=1-644bc36a-7c2015a85b48810567809719",
          "X-Forwarded-For": "187.11.19.27",
          "X-Forwarded-Port": "443",
          "X-Forwarded-Proto": "https",
        },
        multiValueHeaders: {
          accept: ["*/*"],
          "accept-encoding": ["gzip, deflate, br"],
          "accept-language": ["pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7"],
          Authorization: ["RRwPrJsGdiwdWZ1CZj9srRtCdQ99LPeg"],
          "content-type": [
            "multipart/form-data; boundary=----WebKitFormBoundarysHe4EjBGFQHzq81o",
          ],
          Host: ["o0db8iwsg0.execute-api.sa-east-1.amazonaws.com"],
          origin: ["http://localhost:4200"],
          referer: ["http://localhost:4200/"],
          "sec-ch-ua": [
            '"Chromium";v="112", "Google Chrome";v="112", "Not:A-Brand";v="99"',
          ],
          "sec-ch-ua-mobile": ["?0"],
          "sec-ch-ua-platform": ['"Windows"'],
          "sec-fetch-dest": ["empty"],
          "sec-fetch-mode": ["cors"],
          "sec-fetch-site": ["cross-site"],
          "User-Agent": [
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
          ],
          "X-Amzn-Trace-Id": ["Root=1-644bc36a-7c2015a85b48810567809719"],
          "X-Forwarded-For": ["187.11.19.27"],
          "X-Forwarded-Port": ["443"],
          "X-Forwarded-Proto": ["https"],
        },
        queryStringParameters: null,
        multiValueQueryStringParameters: null,
        pathParameters: null,
        stageVariables: null,
        requestContext: {
          resourceId: "xg7yzv",
          resourcePath: "/uploadKeysNFe",
          httpMethod: "POST",
          extendedRequestId: "EFt4vEw4mjQFkuA=",
          requestTime: "28/Apr/2023:13:00:26 +0000",
          path: "/dev/uploadKeysNFe",
          accountId: "841034033442",
          protocol: "HTTP/1.1",
          stage: "dev",
          domainPrefix: "o0db8iwsg0",
          requestTimeEpoch: 1682686826880,
          requestId: "3f415ad0-7300-4e8c-b6e1-27c827b9d6c5",
          identity: {
            cognitoIdentityPoolId: null,
            accountId: null,
            cognitoIdentityId: null,
            caller: null,
            sourceIp: "187.11.19.27",
            principalOrgId: null,
            accessKey: null,
            cognitoAuthenticationType: null,
            cognitoAuthenticationProvider: null,
            userArn: null,
            userAgent:
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36",
            user: null,
          },
          domainName: "o0db8iwsg0.execute-api.sa-east-1.amazonaws.com",
          apiId: "o0db8iwsg0",
        },
        body:
          "------WebKitFormBoundarysHe4EjBGFQHzq81o\r\n" +
          'Content-Disposition: form-data; name=""; filename="CSV_TEMPLATE_CHAVES - Página1.csv"\r\n' +
          "Content-Type: text/csv\r\n" +
          "\r\n" +
          "35230207705530000427550010007940901658883693\r\n" +
          "35230207705530000427550010007940901658883694\r\n" +
          "35230207705530000427550010007940901658883695\r\n" +
          "------WebKitFormBoundarysHe4EjBGFQHzq81o--\r\n",
        isBase64Encoded: false,
      };

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
        "Access-Control-Allow-Origin": "http://localhost:4200",
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
