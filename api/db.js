const defaultKnex = require('knex');
const defaultConfig = require('./knexfile');

module.exports = (knex = defaultKnex, config = defaultConfig) =>
  knex(config[process.env.NODE_ENV]);
