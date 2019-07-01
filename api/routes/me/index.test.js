const tap = require('tap');
const sinon = require('sinon');

const index = require('./index');

tap.test('/me endpoint setup', async endpointTest => {
  const app = {};
  const getEndpoint = sinon.spy();
  const putEndpoint = sinon.spy();

  index(app, { getEndpoint, putEndpoint });

  endpointTest.ok(
    getEndpoint.calledWith(app),
    'users GET endpoint is setup with the app'
  );
  endpointTest.ok(
    putEndpoint.calledWith(app),
    'users PUT endpoint is setup with the app'
  );
});
