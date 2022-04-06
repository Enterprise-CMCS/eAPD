const tap = require('tap');
const sinon = require('sinon');

const rolesIndex = require('./index');

tap.test('auth roles endpoint setup', async endpointTest => {
  const app = {};
  const getEndpoint = sinon.spy();

  rolesIndex(app, getEndpoint);

  endpointTest.ok(
    getEndpoint.calledWith(app),
    'roles GET endpoint is setup with the app'
  );
});
