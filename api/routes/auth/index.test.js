const tap = require('tap');
const sinon = require('sinon');

const apdsIndex = require('./index');

tap.test('auth endpoint setup', async endpointTest => {
  const app = {};
  const activitiesEndpoint = sinon.spy();
  const rolesEndpoint = sinon.spy();
  const certificationsEndpoint = sinon.spy();

  apdsIndex(app, activitiesEndpoint, rolesEndpoint, certificationsEndpoint);

  endpointTest.ok(
    activitiesEndpoint.calledWith(app),
    'auth activities endpoints are setup with the app'
  );
  endpointTest.ok(
    rolesEndpoint.calledWith(app),
    'auth roles endpoints are setup with the app'
  );
  endpointTest.ok(
    certificationsEndpoint.calledWith(app),
    'auth certifications endpoints are setup with the app'
  );
});
