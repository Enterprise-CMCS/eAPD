const tap = require('tap');
const sinon = require('sinon');

const apdsIndex = require('./index');

tap.test('apds endpoint setup', async endpointTest => {
  const app = {};
  const getEndpoint = sinon.spy();
  const putEndpoint = sinon.spy();
  const activitiesEndpoint = sinon.spy();

  apdsIndex(app, getEndpoint, putEndpoint, activitiesEndpoint);

  endpointTest.ok(
    getEndpoint.calledWith(app),
    'apds GET endpoint is setup with the app'
  );
  endpointTest.ok(
    putEndpoint.calledWith(app),
    'apds PUT endpoint is setup with the app'
  );

  endpointTest.ok(
    activitiesEndpoint.calledWith(app),
    'apds activities endpoints are setup with the app'
  );
});
