const FileType = require('file-type');

const validateImage = async buffer => {
  let mime = null;
  try {
    ({ mime } = (await FileType.fromBuffer(buffer)) || {};
  } catch (e) {
    return { error: 'User is trying to upload a text-based file' };
  }
  if (
    mime !== 'image/jpeg' &&
    mime !== 'image/png' &&
    mime !== 'image/gif' &&
    mime !== 'image/webp'
  ) {
    return { error: `User is trying to upload a file type of ${mime}` };
  }
  return { success: true };
};

module.exports = {
  validateFile: validateImage
};
