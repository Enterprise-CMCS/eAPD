const tap = require('tap');
const sinon = require('sinon');

const rolesIndex = require('./index');

tap.test('auth roles endpoint setup', async endpointTest => {
  const app = {};
  const delEndpoint = sinon.spy();
  const getEndpoint = sinon.spy();
  const postEndpoint = sinon.spy();
  const putEndpoint = sinon.spy();

  rolesIndex(app, delEndpoint, getEndpoint, postEndpoint, putEndpoint);

  endpointTest.ok(
    delEndpoint.calledWith(app),
    'roles DELETE endpoint is setup with the app'
  );
  endpointTest.ok(
    getEndpoint.calledWith(app),
    'roles GET endpoint is setup with the app'
  );
  endpointTest.ok(
    postEndpoint.calledWith(app),
    'roles POST endpoint is setup with the app'
  );
  endpointTest.ok(
    putEndpoint.calledWith(app),
    'roles PUT endpoint is setup with the app'
  );
});
