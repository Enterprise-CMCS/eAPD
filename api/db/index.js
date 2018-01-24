const defaultKnex = require('knex');
const defaultBookshelf = require('bookshelf');
const defaultConfig = require('../knexfile');

const users = require('./user');
const authorization = require('./authorization');

module.exports.setup = (knex = defaultKnex, bookshelf = defaultBookshelf, config = defaultConfig, models = [users, authorization]) => {
  const db = knex(config[process.env.NODE_ENV]);
  const orm = bookshelf(db);

  models.forEach(model => model(orm));
};
