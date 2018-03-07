const tap = require('tap');
const sinon = require('sinon');

const statesIndex = require('./index');

tap.test('states endpoint setup', async endpointTest => {
  const app = {};
  const getEndpoint = sinon.spy();
  const putEndpoint = sinon.spy();

  statesIndex(app, getEndpoint, putEndpoint);

  endpointTest.ok(
    getEndpoint.calledWith(app),
    'states GET endpoint is setup with the app'
  );
  endpointTest.ok(
    putEndpoint.calledWith(app),
    'states PUT endpoint is setup with the app'
  );
});
