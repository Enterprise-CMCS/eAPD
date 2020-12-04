const knex = require('./knex');
const affiliations = require('./affiliations');
const apds = require('./apds');
const auth = require('./auth');
const files = require('./files');
const events = require('./events');
const states = require('./states');
const users = require('./users');

module.exports = {
  raw: knex,
  ...affiliations,
  ...auth,
  ...apds,
  ...files,
  ...events,
  ...states,
  ...users
};
