const formatPayload = (records) => {
  return records.map((el) => {
    const key = el.s3.object.key;

    return {
      type: key.substr(key.indexOf(".") + 1),
      fileKey: key,
    };
  });
};

exports.invokeFunction = async (records) => {
  const payload = formatPayload(records);


  console.log(payload)

  return true;
};
