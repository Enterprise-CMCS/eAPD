const apds = require('./apds');
const auth = require('./auth');
const files = require('./files');
const knex = require('./knex');
const states = require('./states');
const users = require('./users');

module.exports = {
  raw: knex,
  ...auth,
  ...apds,
  ...files,
  ...states,
  ...users
};
