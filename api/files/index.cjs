/* eslint-disable global-require */

switch (process.env.FILE_STORE) {
  case 's3':
    module.exports = { ...require('./s3') };
    break;
  case 'local':
  default:
    module.exports = { ...require('./local') };
    break;
}
