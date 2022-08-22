module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: 'localhost',
      database: 'hitech_apd',
      user: 'postgres',
      password: 'cms',
      port: 54325
    },
    seeds: { directory: './seeds/development' }
  }
};
