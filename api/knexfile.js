module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: 'db',
      database: 'hitech_apd',
      user: 'postgres',
      password: 'cms'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
