const tap = require('tap');
const sinon = require('sinon');

const auth = require('../../auth/authenticate.js')(
  {},
  {}
);

tap.test('local authentication', (authTest) => {
  const doneCallback = sinon.spy();
  authTest.beforeEach((done) => {
    doneCallback.reset();
    done();
  });

  authTest.test('with invalid username', (invalidTest) => {
    auth(null, 'world', doneCallback);
    invalidTest.equal(doneCallback.callCount, 1, 'called done callback once');
    invalidTest.ok(doneCallback.calledWith(sinon.match.truthy), 'got an error message');
    invalidTest.done();
  });

  authTest.test('with invalid password', (invalidTest) => {
    auth('hello', null, doneCallback);
    invalidTest.equal(doneCallback.callCount, 1, 'called done callback once');
    invalidTest.ok(doneCallback.calledWith(sinon.match.truthy), 'got an error message');
    invalidTest.done();
  });

  authTest.test('with invalid password', (validTest) => {
    auth('hello', 'world', doneCallback);
    validTest.equal(doneCallback.callCount, 1, 'called done callback once');
    validTest.ok(doneCallback.calledWith(null, sinon.match.any), 'did not get an error message, did get a user object');
    validTest.done();
  });

  authTest.done();
});
