import f from 'fs';
import path from 'path';

export const getFile = async (id, { fs = f } = {}) => {
  if (!process.env.FILE_PATH) {
    return Promise.reject(new Error('No file path specified'));
  }
  if (!f.existsSync(process.env.FILE_PATH)) {
    f.mkdirSync(process.env.FILE_PATH);
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
  if (!process.env.FILE_PATH) {
    return Promise.reject(new Error('No file path specified'));
  }
  if (!f.existsSync(process.env.FILE_PATH)) {
    f.mkdirSync(process.env.FILE_PATH);
  }
  return new Promise((resolve, reject) => {
    fs.writeFile(path.join(process.env.FILE_PATH, id), buffer, err => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
};
