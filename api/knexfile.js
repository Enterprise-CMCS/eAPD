export default {
  development: {
    client: 'postgresql',
    connection: {
      host: process.env.DEV_DB_HOST || 'db',
      database: process.env.DEV_DB_NAME || 'hitech_apd',
      port: process.env.DEV_DB_PORT || 5432,
      user: process.env.DEV_DB_USER || 'postgres',
      password: process.env.DEV_DB_PASSWORD || 'cms'
    },
    seeds: { directory: './seeds/development' },
    migrations: {
      stub: 'migrations-template.js'
    }
  },

  test: {
    client: 'postgresql',
    connection: {
      host: process.env.TEST_DB_HOST || 'db',
      database: process.env.TEST_DB_NAME || 'hitech_apd_test',
      port: process.env.TEST_DB_PORT || 5432,
      user: process.env.TEST_DB_USER || 'postgres',
      password: process.env.TEST_DB_PASSWORD || 'cms'
    },
    seeds: { directory: './seeds/test' }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    seeds: { directory: './seeds/production' }
  }
};
