const tap = require('tap');
const sinon = require('sinon');

const serialization = require('../../auth/serialization');

tap.test('passport serialization', (serializationTest) => {
  const doneCallback = sinon.spy();
  serializationTest.beforeEach((done) => {
    doneCallback.reset();
    done();
  });

  serializationTest.test('serialize a user', (serializeTest) => {
    const user = { id: 'the-user-id' };
    serialization.serializeUser(user, doneCallback);
    serializeTest.ok(doneCallback.calledWith(null, 'the-user-id'), 'serializes the user object');
    serializeTest.done();
  });

  serializationTest.test('deserialize a user', (deserializeTest) => {
    const userID = 'the-user-id';
    serialization.deserializeUser(userID, doneCallback);
    deserializeTest.ok(doneCallback.calledWith(null, sinon.match.object), 'deserializes the user ID to an object');
    deserializeTest.equal(doneCallback.args[0][1].id, userID, 'output user object ID matches input user ID');
    deserializeTest.done();
  });

  serializationTest.done();
});
