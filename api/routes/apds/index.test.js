const tap = require('tap');
const sinon = require('sinon');

const statesIndex = require('./index');

tap.test('states endpoint setup', async endpointTest => {
  const app = {};
  const getEndpoint = sinon.spy();

  statesIndex(app, getEndpoint);

  endpointTest.ok(
    getEndpoint.calledWith(app),
    'states GET endpoint is setup with the app'
  );
});
