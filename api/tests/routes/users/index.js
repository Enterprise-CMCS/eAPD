const tap = require('tap');
const sinon = require('sinon');

const usersIndex = require('../../../routes/users');

tap.test('users endpoint setup', endpointTest => {
  const app = {};
  const postEndpoint = sinon.spy();
  const getEndpoint = sinon.spy();

  usersIndex(app, postEndpoint, getEndpoint);

  endpointTest.ok(
    postEndpoint.calledWith(app),
    'users POST endpoint is setup with the app'
  );
  endpointTest.ok(
    getEndpoint.calledWith(app),
    'users GET endpoint is setup with the app'
  );
  endpointTest.done();
});
