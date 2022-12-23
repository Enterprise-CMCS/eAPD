import { getFile as s3getFile, putFile as s3putFile } from './s3.js';
import { getFile as localGetFile, putFile as localPutFile } from './local.js';

export const getFile = (...props) => {
  if (process.env.FILE_STORE === 's3') {
    return s3getFile(...props);
  }
  return localGetFile(...props);
};
export const putFile = (...props) => {
  if (process.env.FILE_STORE === 's3') {
    return s3putFile(...props);
  }
  return localPutFile(...props);
};
