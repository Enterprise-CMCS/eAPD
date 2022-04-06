const sharp = require('sharp');
const ft = require('file-type');

const MAX_WIDTH = 700;
const MAX_HEIGHT = 1100;

const validateImage = async buffer => {
  const image = sharp(buffer, {
    failOnError: true,
    sequentialRead: true
  });

  return image
    .metadata()
    .then(async metadata => {
      const { width, height, format } = metadata;
      if (
        format !== 'jpeg' &&
        format !== 'gif' &&
        format !== 'png' &&
        format !== 'webp' &&
        format !== 'tiff'
      ) {
        return { error: 'Unsupported file format' };
      }

      const config = { fit: 'inside' };
      if (width > MAX_WIDTH) config.width = MAX_WIDTH;
      if (height > MAX_HEIGHT) config.height = MAX_HEIGHT;
      const data = await image
        .resize(config)
        .png()
        .toBuffer();
      return { image: data };
    })
    .catch(err => {
      return { error: err };
    });
};

const validateDoc = async buffer => {
  try {
    const { ext = null } = await ft.fromBuffer(buffer); 
    if (
      ext !== 'doc' &&
      ext !== 'docx' &&
      ext !== 'pdf'
    ) {
      return { error: 'Unsupported file format' };
    }
    return {};    
  } catch (e) {
    return { error: 'Unsupported file format' };
  }  
}

module.exports = {
  validateFile: validateImage,
  validateDoc
};
