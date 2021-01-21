const FileType = require('file-type');

const validateImage = async buffer => {
  const { mime = null } = (await FileType.fromBuffer(buffer)) || {};
  if (!mime) {
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

exports.module = {
  validateFile: validateImage
};
