module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: process.env.DEV_DB_HOST || 'db',
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
