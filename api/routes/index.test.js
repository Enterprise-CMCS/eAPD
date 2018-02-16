const tap = require('tap');
const sinon = require('sinon');

const endpointIndex = require('./index');

tap.test('endpoint setup', async endpointTest => {
  const app = {};
  const rolesEndpoint = sinon.spy();
  const usersEndpoint = sinon.spy();
  const formLoggerEndpoint = sinon.spy();

  endpointIndex(app, rolesEndpoint, usersEndpoint, formLoggerEndpoint);

  endpointTest.ok(
    rolesEndpoint.calledWith(app),
    'roles endpoint is setup with the app'
  );
  endpointTest.ok(
    usersEndpoint.calledWith(app),
    'users endpoint is setup with the app'
  );
  endpointTest.ok(
    formLoggerEndpoint.calledWith(app),
    'form logger endpoint is setup with the app'
  );
});
