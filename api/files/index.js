import { getFile as s3getFile, putFile as s3putFile } from './s3.js';
import { getFile as localGetFile, putFile as localPutFile } from './local.js';

export const getFile = props =>
  process.env.FILE_STORE === 's3' ? s3getFile(props) : localGetFile(props);
export const putFile = props =>
  process.env.FILE_STORE === 's3' ? s3putFile(props) : localPutFile(props);
