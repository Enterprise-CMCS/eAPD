const knex = require('./knex');
const users = require('./users');

module.exports = {
  knex,
  ...users
};
