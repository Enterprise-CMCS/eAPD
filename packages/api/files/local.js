const f = require('fs');
const path = require('path');

if (!process.env.FILE_PATH) {
  module.exports = {
    getFile: () => Promise.reject(new Error('No file path specified')),
    putFile: () => Promise.reject(new Error('No file path specified'))
  };
} else {
  if (!f.existsSync(process.env.FILE_PATH)) {
    f.mkdirSync(process.env.FILE_PATH);
  }

  const getFile = async (id, { fs = f } = {}) =>
    new Promise((resolve, reject) => {
      fs.readFile(path.join(process.env.FILE_PATH, id), (err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      });
    });

  const putFile = async (id, buffer, { fs = f } = {}) =>
    new Promise((resolve, reject) => {
      fs.writeFile(path.join(process.env.FILE_PATH, id), buffer, err => {
        if (err) {
          return reject(err);
        }
        return resolve();
      });
    });

  module.exports = { getFile, putFile };
}
