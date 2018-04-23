const tap = require('tap');
const sinon = require('sinon');

const usersIndex = require('./index');

tap.test('users endpoint setup', async endpointTest => {
  const app = {};
  const delEndpoint = sinon.spy();
  const getEndpoint = sinon.spy();
  const postEndpoint = sinon.spy();

  usersIndex(app, delEndpoint, getEndpoint, postEndpoint);

  endpointTest.ok(
    delEndpoint.calledWith(app),
    'users DELETE endpoint is setup with the app'
  );
  endpointTest.ok(
    getEndpoint.calledWith(app),
    'users GET endpoint is setup with the app'
  );
  endpointTest.ok(
    postEndpoint.calledWith(app),
    'users POST endpoint is setup with the app'
  );
});
