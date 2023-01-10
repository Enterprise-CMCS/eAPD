import f from 'fs';
import path from 'path';

if (process.env.FILE_PATH && !f.existsSync(process.env.FILE_PATH)) {
  f.mkdirSync(process.env.FILE_PATH);
}

export const getFile = async (id, { fs = f } = {}) => {
  if (!process.env.FILE_PATH) {
    return Promise.reject(new Error('No file path specified'));
  }

  return new Promise((resolve, reject) => {
    fs.readFile(path.join(process.env.FILE_PATH, id), (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });
};

export const putFile = async (id, buffer, { fs = f } = {}) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path.join(process.env.FILE_PATH, id), buffer, err => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
};
