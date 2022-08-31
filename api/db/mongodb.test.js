const mongoose = require('mongoose');
const tap = require('tap');

const { setup, teardown } = require('./mongodb');

const STATE = {
  disconnected: 0,
  connected: 1,
  connecting: 2,
  disconnecting: 3
};

tap.test('mongo', async mongoTests => {
  mongoTests.test('setup/teardown', async setupTest => {
    await setup();
    setupTest.equal(
      mongoose.connection.readyState,
      STATE.connected,
      'Mongoose is connected'
    );

    await teardown();
    setupTest.equal(
      mongoose.connection.readyState,
      STATE.disconnected,
      'Mongoose is disconnected'
    );
  });
});
