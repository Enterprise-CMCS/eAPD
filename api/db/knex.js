const knex = require('knex');
const config = require('../knexfile');

const db = process.env.NODE_ENV ? knex(config[process.env.NODE_ENV]) : () => {};

module.exports = db;
