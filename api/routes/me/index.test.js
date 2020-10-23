const tap = require('tap');
const sinon = require('sinon');

const index = require('./index');

tap.test('/me endpoint setup', async endpointTest => {
  const app = {};
  const getEndpoint = sinon.spy();

  index(app, { getEndpoint });

  endpointTest.ok(
    getEndpoint.calledWith(app),
    'users GET endpoint is setup with the app'
  );
});
