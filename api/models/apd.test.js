const mongoose = require('mongoose');
const tap = require('tap');
const toMongodb = require('jsonpatch-to-mongodb');

const mongo = require('../db/mongodb');

const { apd } = require('../seeds/development/apds');

let newApd;
let APD;

tap.test('APD model test', async t => {
  t.before(async () => {
    await mongo.setup();
    APD = mongoose.model('APD');
  });

  t.beforeEach(async () => {
    newApd = new APD({
      status: 'draft',
      stateId: 'md',
      ...apd
    });
    newApd = await newApd.save();
  });

  t.test('get APD', async test => {
    const found = await APD.findOne({ _id: newApd._id }); // eslint-disable-line no-underscore-dangle

    test.ok(!!found, 'Found the APD that was just added');
  });

  t.test('patch APD', async test => {
    const id = newApd._id; // eslint-disable-line no-underscore-dangle
    await APD.updateOne(
      { _id: id },
      toMongodb([
        {
          op: 'replace',
          path: '/activities/0/outcomes/1/metrics/1/metric',
          value: 'TEST VALUE'
        }
      ])
    );

    const updatedApd = await APD.findOne({ _id: id }).exec();

    test.equal(
      updatedApd.activities[0].outcomes[1].metrics[1].metric,
      'TEST VALUE',
      'APD was patched'
    );
  });

  t.afterEach(async () => {
    await newApd.remove();
  });

  t.teardown(async () => {
    await mongo.teardown();
  });
});
