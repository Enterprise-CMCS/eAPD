const FileType = require('file-type');
const Jimp = require('jimp');

const MAX_WIDTH = 700;
const MAX_HEIGHT = 1100;

// Validate content and resize
const resize = (buffer, mime) => {
  return new Promise((resolve, reject) => {
    Jimp.read(buffer, async (readErr, image) => {
      if (readErr) reject(readErr);

      const { width } = image.bitmap;
      if (width > MAX_WIDTH) {
        await image.resize(MAX_WIDTH, Jimp.AUTO);
      }

      const { height } = image.bitmap;
      if (height > MAX_HEIGHT) {
        await image.resize(Jimp.AUTO, MAX_HEIGHT);
      }

      image.getBuffer(mime, (bufferErr, imgBuffer) => {
        if (bufferErr) reject(bufferErr);
        resolve(imgBuffer);
      });
    });
  });
};

const validateImage = async buffer => {
  // Testing Mime yype
  let mime = null;
  try {
    ({ mime } = (await FileType.fromBuffer(buffer)) || {});
  } catch (e) {
    return { error: 'User is trying to upload a text-based file' };
  }
  if (mime !== 'image/jpeg' && mime !== 'image/png' && mime !== 'image/gif') {
    return { error: `User is trying to upload a file type of ${mime}` };
  }

  // Testing file content
  try {
    const imgBuffer = await resize(buffer, mime);
    return { image: imgBuffer };
  } catch (e) {
    return { error: 'File is not valid' };
  }
};

module.exports = {
  validateFile: validateImage
};
