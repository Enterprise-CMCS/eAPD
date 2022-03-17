// https://medium.com/@sobinsunny/orm-console-with-repl-961ee264ed93

// usage:
// $ yarn run knex-console
// knex> const rows = await knex('apds')
// knex> rows[0].document.activities
// knex> await db.getPermissions(2020)
// knex> .exit

require('dotenv').config();
const repl = require('repl');

const knex = require('./db/knex');
const db = require('./db');

const r = repl.start('knex> ');
const run = async () => {
  r.context.knex = knex;
  r.context.db = db;
};
run();
