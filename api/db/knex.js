import knex from 'knex';
import config from '../knexfile';

const { NODE_ENV } = process.env;
if (!NODE_ENV) {
  let msg = '❌ NODE_ENV is not set, unable to determine knex configuration\n';
  msg += "Please set NODE_ENV to 'development', 'test', or 'production'\n";
  msg += 'Terminating...';
  console.error(msg); /* eslint-disable-line no-console */
  process.exit(1);
}

export default knex(config[NODE_ENV]);
