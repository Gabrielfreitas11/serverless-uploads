const { HttpResponse } = require("@impostograma/common");

const { invokeFunction } = require("./functions/invokeFunction");

module.exports = async (event) => {
  try {
    event = {
      Records: [
        {
          eventVersion: "2.1",
          eventSource: "aws:s3",
          awsRegion: "sa-east-1",
          eventTime: "2023-05-29T15:56:26.405Z",
          eventName: "ObjectCreated:Put",
          userIdentity: {
            principalId: "A1GTVCCWMS9KNZ",
          },
          requestParameters: {
            sourceIPAddress: "189.33.66.200",
          },
          responseElements: {
            "x-amz-request-id": "4RXBXBQB73SHDRYW",
            "x-amz-id-2":
              "ojHHSZ7Tt+EKux00VrfjM0O3SK82d5UY2IP9+MPSDF4re9JgZmEXWfIlNbFfCukLo6O6VlcfNOl7eResEXUnxrIPF1PKkUx8",
          },
          s3: {
            s3SchemaVersion: "1.0",
            configurationId: "3272351e-7b22-4c21-b0cb-30a6b66205df",
            bucket: {
              name: "tmp-process",
              ownerIdentity: {
                principalId: "A1GTVCCWMS9KNZ",
              },
              arn: "arn:aws:s3:::tmp-process",
            },
            object: {
              key: "revisao/000451-35819530000140.csv",
              size: 167000,
              eTag: "ce5f5b78e8221dbfa06a351f5cfb2fae",
              sequencer: "006474CB2A4B32032D",
            },
          },
        },
      ],
    };

    await invokeFunction(event.Records);

    return HttpResponse.ok({
      message: "Chaves roteadas com sucesso",
    });
  } catch (error) {
    console.log(error);
    return HttpResponse.serverError({
      error: error?.message,
      message: "Ocorreu um erro ao realizar o upload das chaves",
    });
  }
};
