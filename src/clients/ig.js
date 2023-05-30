const axios = require("axios");

const {Http} = require("@impostograma/common");

const FormData = require("form-data");

const uuid = require("uuid");

module.exports = {
  async uploadFile(filesBuffer) {
    try {
      const formData = new FormData();

      filesBuffer.forEach((el) => {
        formData.append("file", el, {
          filename: `${uuid.v4()}.xml`,
        });
      });

      const options = {
        url: `${process.env.BASE_URL_EMALOTE}/Arquivo/XmlUploadTeste`,
        method: "POST",
        data: formData,
        headers: {
          ...formData.getHeaders(),
          Authorization: `Bearer ${process.env.AUTH_EMALOTE}`,
        },
        cache: false,
      };


      console.log(options)

      const { data } = await Http(options);

      return data;
    } catch (error) {
      console.log(error?.message);

      throw error;
    }
  },
};
