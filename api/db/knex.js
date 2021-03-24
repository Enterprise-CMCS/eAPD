const knex = require('knex');
const config = require('../knexfile');
const { ERRORS } = require('../util/errorCodes');

const { NODE_ENV } = process.env;
if (!NODE_ENV) {
  let msg = '❌ NODE_ENV is not set, unable to determine knex configuration\n';
  msg += "Please set NODE_ENV to 'development', 'test', or 'production'\n";
  msg += 'Terminating...';
  console.error(msg); /* eslint-disable-line no-console */
  process.exit(1);
}

const safeKnex = () => {
  const safe = knex(config[NODE_ENV]);

  if (!safe.pool) {
    throw new Error(ERRORS.NO_CONNECTION);
  }

  return safe;
};

module.exports = safeKnex;
