module.exports = (knex, config) => knex(config)[process.env.NODE_ENV];
