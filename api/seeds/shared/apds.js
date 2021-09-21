const seeder = require('mongoose-seed');

// Connect to MongoDB via Mongoose
exports.seed = data =>
  new Promise(resolve => {
    seeder.connect(process.env.MONGO_URL, { useUnifiedTopology: true }, () => {
      // Load Mongoose models
      seeder.loadModels(['./models/apd.js']);

      // Clear specified collections
      seeder.clearModels(['APD'], () => {
        // Callback to populate DB once collections have been cleared
        seeder.populateModels(data, () => {
          seeder.disconnect();
          resolve();
        });
      });
    });
  });

exports.drop = () =>
  new Promise(resolve => {
    seeder.connect(process.env.MONGO_URL, { useUnifiedTopology: true }, () => {
      // Load Mongoose models
      seeder.loadModels(['./models/apd.js']);

      // Clear specified collections
      seeder.clearModels(['APD'], () => {
        seeder.disconnect();
        resolve();
      });
    });
  });
