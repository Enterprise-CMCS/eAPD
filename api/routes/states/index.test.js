const tap = require('tap');
const sinon = require('sinon');

const statesIndex = require('./index');

tap.test('states endpoint setup', async endpointTest => {
  const app = {};
  const putEndpoint = sinon.spy();

  statesIndex(app, putEndpoint);

  endpointTest.ok(
    putEndpoint.calledWith(app),
    'states PUT endpoint is setup with the app'
  );
});
