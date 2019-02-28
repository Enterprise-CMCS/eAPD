const tap = require('tap');
const sinon = require('sinon');

const usersIndex = require('./index');

tap.test('users endpoint setup', async endpointTest => {
  const app = {};
  const deleteEndpoint = sinon.spy();
  const getEndpoint = sinon.spy();
  const postEndpoint = sinon.spy();
  const putEndpoint = sinon.spy();

  usersIndex(app, { deleteEndpoint, getEndpoint, postEndpoint, putEndpoint });

  endpointTest.ok(
    deleteEndpoint.calledWith(app),
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
  endpointTest.ok(
    putEndpoint.calledWith(app),
    'users PUT endpoint is setup with the app'
  );
});
