var fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const saveImg = function (data) {
    if (data === undefined) return false;
    const name = `${uuidv4()}(${data.name})${data.name
        .match(/\.[A-Za-z0-9]*/gi)
        .pop()}`;
    const baseImage = data.data;

    const ext = baseImage.substring(
        baseImage.indexOf("/") + 1,
        baseImage.indexOf(";base64")
    );
    const fileType = baseImage.substring("data:".length, baseImage.indexOf("/"));

    const regex = new RegExp(`^data:${fileType}\/${ext};base64,`, "gi");

    const base64Data = baseImage.replace(regex, "");
    const rand = Math.ceil(Math.random() * 1000);
    const localPath = '.' + process.env.IMG_SAVE_PATH + "front/public/savedImg/";
    fs.writeFileSync(localPath + name, base64Data, "base64")
    return name;
};




module.exports = saveImg