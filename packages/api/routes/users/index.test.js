const tap = require('tap');
const sinon = require('sinon');

const usersIndex = require('./index');

tap.test('users endpoint setup', async endpointTest => {
  const app = {};
  const getEndpoint = sinon.spy();

  usersIndex(app, { getEndpoint });

  endpointTest.ok(
    getEndpoint.calledWith(app),
    'users GET endpoint is setup with the app'
  );
});
