const mongoose = require('mongoose');
const tap = require('tap');
const sinon = require('sinon');

const mongo = require('./mongodb');

const onSpy = sinon.spy(mongoose.connection, 'on');
const onceSpy = sinon.spy(mongoose.connection, 'once');

tap.test('mongo', async t => {
  t.beforeEach(async () => {
    onSpy.resetHistory();
    onceSpy.resetHistory();
  });

  t.test('setup', async test => {
    const connection = await mongo.setup();

    test.ok(onSpy.calledWith('connected'), 'Mongoose connected successfully');

    test.ok(onceSpy.calledWith('open'), 'Mongoose connect is open');

    await connection.close();
    test.ok(
      onSpy.calledWith('disconnected'),
      'Mongoose disconnected successfully'
    );
  });
});
