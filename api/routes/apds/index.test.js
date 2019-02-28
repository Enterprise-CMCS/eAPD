const tap = require('tap');
const sinon = require('sinon');

const apdsIndex = require('./index');

tap.test('apds endpoint setup', async endpointTest => {
  const app = {};
  const deleteEndpoint = sinon.spy();
  const getEndpoint = sinon.spy();
  const postEndpoint = sinon.spy();
  const putEndpoint = sinon.spy();
  const statusEndpoints = sinon.spy();
  const submittedEndpoints = sinon.spy();
  const versionsEndpoints = sinon.spy();

  apdsIndex(app, {
    deleteEndpoint,
    getEndpoint,
    postEndpoint,
    putEndpoint,
    statusEndpoints,
    submittedEndpoints,
    versionsEndpoints
  });

  endpointTest.ok(
    deleteEndpoint.calledWith(app),
    'apds DELETE endpoint is setup with the app'
  );
  endpointTest.ok(
    getEndpoint.calledWith(app),
    'apds GET endpoint is setup with the app'
  );
  endpointTest.ok(
    postEndpoint.calledWith(app),
    'apds POST endpoint is setup with the app'
  );
  endpointTest.ok(
    putEndpoint.calledWith(app),
    'apds PUT endpoint is setup with the app'
  );

  endpointTest.ok(
    statusEndpoints.calledWith(app),
    'apds status endpoints are setup with the app'
  );

  endpointTest.ok(
    submittedEndpoints.calledWith(app),
    'submitted apds endpoints are setup with the app'
  );

  endpointTest.ok(
    versionsEndpoints.calledWith(app),
    'apds versions endpoints are setup with the app'
  );
});
