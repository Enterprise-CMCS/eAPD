const tap = require('tap');
const sinon = require('sinon');

const endpointIndex = require('./index');

tap.test('endpoint setup', async endpointTest => {
  const app = {
    get: sinon.spy()
  };
  const usersEndpoint = sinon.spy();
  const formLoggerEndpoint = sinon.spy();

  endpointIndex(app, usersEndpoint, formLoggerEndpoint);

  endpointTest.ok(
    usersEndpoint.calledWith(app),
    'users endpoint is setup with the app'
  );
  endpointTest.ok(
    formLoggerEndpoint.calledWith(app),
    'form logger endpoint is setup with the app'
  );

  endpointTest.ok(
    app.get.calledWith('/open-api', sinon.match.func),
    'sets up an endpoint to fetch OpenAPI spec'
  );
});
