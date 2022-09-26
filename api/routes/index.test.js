const tap = require('tap');
const sinon = require('sinon');
const endpointIndex = require('./index');

tap.test('endpoint setup', async endpointTest => {
  const app = {
    get: sinon.spy(),
    use: sinon.spy()
  };
  const res = {
    send: sinon.spy()
  };

  const affiliationsEndpoint = sinon.spy();
  const apdsEndpoint = sinon.spy();
  const apdsEventsEndpoint = sinon.spy();
  const apdsFilesEndpoint = sinon.spy();
  const authEndpoint = sinon.spy();
  const docsEndpoint = sinon.spy();
  const meEndpoint = sinon.spy();
  const rolesEndpoint = sinon.spy();
  const statesEndpoint = sinon.spy();
  const stateAffiliationEndpoint = sinon.spy();
  const usersEndpoint = sinon.spy();
  const openAPI = {};

  endpointIndex(app, {
    affiliationsEndpoint,
    apdsEndpoint,
    apdsEventsEndpoint,
    apdsFilesEndpoint,
    authEndpoint,
    docsEndpoint,
    rolesEndpoint,
    statesEndpoint,
    stateAffiliationEndpoint,
    usersEndpoint,
    openAPIdoc: {}
  });

  endpointTest.ok(
    affiliationsEndpoint.calledWith(app),
    'affiliations endpoint is set up with the app'
  );
  endpointTest.ok(
    apdsEndpoint.calledWith(app),
    'apds endpoint is setup with the app'
  );
  endpointTest.ok(
    apdsEventsEndpoint.calledWith(app),
    'apds events endpoint is setup with the app'
  );

  endpointTest.ok(
    apdsFilesEndpoint.calledWith(app),
    'apds files endpoint is setup with the app'
  );

  endpointTest.ok(
    authEndpoint.calledWith(app),
    'auth endpoint is setup with the app'
  );
  endpointTest.ok(
    docsEndpoint.calledWith(app),
    'docs endpoint is set up with the app'
  );
  endpointTest.notOk(
    meEndpoint.calledWith(app),
    'me endpoint is no longer setup with the app'
  );
  endpointTest.ok(
    rolesEndpoint.calledWith(app),
    'roles endpoint is set up with the app'
  );
  endpointTest.ok(
    statesEndpoint.calledWith(app),
    'states endpoint is set up with the app'
  );
  endpointTest.ok(
    stateAffiliationEndpoint.calledWith(app),
    'state Affiliation endpoint is set up with the app'
  );
  endpointTest.ok(
    usersEndpoint.calledWith(app),
    'users endpoint is setup with the app'
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

  // endpointTest.test('GET /api-docs', async t => {
  //   const response = await request(api).get('/api-docs');
  //   t.equal(response.status, 301, 'successful');
  // });
});
