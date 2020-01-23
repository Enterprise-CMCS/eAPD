module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: process.env.DEV_DB_HOST || 'db',
      database: 'hitech_apd',
      user: process.env.DEV_DB_USER || 'postgres',
      password: process.env.DEV_DB_PASSWORD || 'cms'
    }
  },

  test: {
    client: 'postgresql',
    connection: {
      host: process.env.TEST_DB_HOST || 'db',
      database: 'hitech_apd_test',
      user: 'postgres',
      password: 'cms'
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL
  }
};
