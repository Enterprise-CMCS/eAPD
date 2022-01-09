const { Seeder } = require('mongoose-data-seed');
const APD = require('../models/apd');

const { data } = require(`../seeds/${process.env.NODE_ENV}/apds`);

class ApdSeeder extends Seeder {
  async shouldRun() {
    const count = await APD.countDocuments().exec();

    return count === 0;
  }

  async run() {
    return APD.create(data);
  }
}

module.exports = {
  ApdSeeder,
  APD
};
