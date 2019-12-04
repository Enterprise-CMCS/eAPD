/* eslint-disable global-require */

switch (process.env.FILE_STORE) {
  case 'local':
  default:
    module.exports = { ...require('./local') };
    break;
}
