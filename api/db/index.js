const knex = require('./knex');
const affiliations = require('./affiliations');
const apds = require('./apds');
const auth = require('./auth');
const certifications = require('./certifications');
const files = require('./files');
const events = require('./events');
const roles = require('./roles');
const states = require('./states');
const users = require('./users');

module.exports = {
  raw: knex,
  ...affiliations,
  ...auth,
  ...apds,
  ...certifications,
  ...files,
  ...events,
  ...roles,
  ...states,
  ...users
};
