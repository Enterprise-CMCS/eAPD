const mongoose = require('mongoose');

const { ApdSeeder, APD } = require('./mongo-seeds/apds.seeder.js');
const models = [APD];

const mongoURL =
  process.env.MONGO_URL || 'mongodb://mongo:cms@mongo:27017/eapd';

/**
 * Seeders List
 * order is important
 * @type {Object}
 */
const seedersList = {
  ApdSeeder
};
/**
 * Connect to mongodb implementation
 * @return {Promise}
 */
const connect = async () =>
  await mongoose.connect(mongoURL, { useNewUrlParser: true });
/**
 * Drop/Clear the database implementation
 * @return {Promise}
 */
const dropdb = async () => {
  for (let model of models) {
    try {
      await model.collection.drop();
    } catch (e) {
      if (e.code === 26) {
        console.log(`namespace ${model.collection.name} not found`);
      } else {
        throw e;
      }
    }
  }
};

module.exports = {
  seedersList,
  connect,
  dropdb
};
