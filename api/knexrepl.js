// https://medium.com/@sobinsunny/orm-console-with-repl-961ee264ed93

// usage:
// $ npm run knex-console
// knex> const rows = await knex('apds')
// knex> rows[0].document.activities
// knex> .exit

require('dotenv').config();
const repl = require('repl');
const knex = require('./db/knex');

const r = repl.start('knex> ');
const run = async () => {
  r.context.knex = await knex;
};
run();
