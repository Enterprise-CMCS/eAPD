module.exports = {
  dbConnectionUri: process.env.MONGO_ADMIN_URL || process.env.MONGO_URL,
  migrationsDir: 'mongo-migrations'
};
