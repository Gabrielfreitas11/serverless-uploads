exports.getKeysFromBase64 = async (file) => {
  try {
    const splitContent = file.split(" ");

    const content = splitContent[splitContent.length - 1]
      .replace(/-|text\/csv/g, "")
      .trim();

    const keys = content.replace(/\r/g, "").split("\n");

    const validKeys = keys.filter((x) => x.length == 44);

    return validKeys;
  } catch (error) {
    console.log(error);
    return null;
  }
};
