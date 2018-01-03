const tap = require('tap');
const sinon = require('sinon');

const endpointIndex = require('./index');

tap.test('endpoint setup', endpointTest => {
  const app = {};
  const usersEndpoint = sinon.spy();

  endpointIndex(app, usersEndpoint);

  endpointTest.ok(
    usersEndpoint.calledWith(app),
    'users endpoint is setup with the app'
  );
  endpointTest.done();
});
