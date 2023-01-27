import { getFile as s3getFile, putFile as s3putFile } from './s3.js';
import { getFile as localGetFile, putFile as localPutFile } from './local.js';

let getFileFunction;
let putFileFunction;

if (process.env.FILE_STORE === 's3') {
  getFileFunction = s3getFile;
  putFileFunction = s3putFile;
} else {
  getFileFunction = localGetFile;
  putFileFunction = localPutFile;
}

export const getFile = getFileFunction;
export const putFile = putFileFunction;
