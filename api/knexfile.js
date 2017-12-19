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

  test: {
    client: 'postgresql',
    connection: {
      host: 'db',
      database: 'hitech_apd_test',
      user: 'postgres',
      password: 'cms'
    }
  },

  staging: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL
  }
};
