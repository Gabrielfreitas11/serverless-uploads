const { request } = require("../../../../common/http");

const filterkeys = (file) => {
  //nfe = C100
  //cte = D100

  const keys = [];

  file.forEach((el) => {
    if (
      el.substring(0, 6).includes("C100") ||
      el.substring(0, 6).includes("D100")
    ) {
      const key = el.split("|")[9];
      if (key.replace(/[^0-9]/g, "").length == 44) {
        keys.push(key);
      }
    }
  });

  return keys;
};

exports.getKeysFromPVA = async (fileUrl) => {
  try {
    const options = {
      url: fileUrl,
      method: "GET",
      headers: {
        "Content-Type": "application/txt",
      },
    };

    const file = await request(options);

    const keys = filterkeys(file.data.split("\r\n"));

    return keys;
  } catch (error) {
    console.log(error);
    return null;
  }
};
