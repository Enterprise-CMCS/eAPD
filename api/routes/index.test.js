const tap = require('tap');
const sinon = require('sinon');

const loggedInMiddleware = require('../auth/middleware').loggedIn;
const endpointIndex = require('./index');

tap.test('endpoint setup', async endpointTest => {
  const app = {
    get: sinon.spy()
  };
  const res = {
    send: sinon.spy()
  };

  const apdsEndpoint = sinon.spy();
  const authEndpoint = sinon.spy();
  const statesEndpoint = sinon.spy();
  const usersEndpoint = sinon.spy();
  const formLoggerEndpoint = sinon.spy();
  const openAPI = {};

  endpointIndex(
    app,
    apdsEndpoint,
    authEndpoint,
    statesEndpoint,
    usersEndpoint,
    formLoggerEndpoint,
    {}
  );

  endpointTest.ok(
    apdsEndpoint.calledWith(app),
    'apds endpoint is setup with the app'
  );
  endpointTest.ok(
    authEndpoint.calledWith(app),
    'auth endpoint is setup with the app'
  );
  endpointTest.ok(
    statesEndpoint.calledWith(app),
    'states endpoint is setup with the app'
  );
  endpointTest.ok(
    usersEndpoint.calledWith(app),
    'users endpoint is setup with the app'
  );
  endpointTest.ok(
    formLoggerEndpoint.calledWith(app),
    'form logger endpoint is setup with the app'
  );

  endpointTest.ok(
    app.get.calledWith('/me', loggedInMiddleware, sinon.match.func),
    'sets up an endpoint to fetch the current user'
  );

  endpointTest.ok(
    app.get.calledWith('/open-api', sinon.match.func),
    'sets up an endpoint to fetch OpenAPI spec'
  );

  endpointTest.test(
    'OpenAPI handler returns expected documentation',
    async openAPItest => {
      const openAPIHandler = app.get.args.filter(
        arg => arg[0] === '/open-api'
      )[0][1];

      openAPIHandler({}, res);

      openAPItest.ok(
        res.send.calledWith(openAPI),
        'sends back OpenAPI documentation'
      );
    }
  );

  endpointTest.test('"me" handler returns the current user', async meTest => {
    const meHandler = app.get.args.filter(arg => arg[0] === '/me')[0][2];

    meHandler({ user: { id: 'user-id' } }, res);

    meTest.ok(
      res.send.calledWith({ id: 'user-id' }),
      'sends back the user object'
    );
  });
});
