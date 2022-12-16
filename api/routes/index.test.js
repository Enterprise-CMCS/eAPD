import tap from 'tap';
import { spy, match } from 'sinon';
import endpointIndex from './index.js';

tap.test('endpoint setup', { timeout: 300000 }, async endpointTest => {
  const app = {
    get: spy(),
    use: spy()
  };
  const res = {
    send: spy()
  };

  const affiliationsEndpoint = spy();
  const apdsEndpoint = spy();
  const apdsEventsEndpoint = spy();
  const apdsFilesEndpoint = spy();
  const authEndpoint = spy();
  const docsEndpoint = spy();
  const meEndpoint = spy();
  const rolesEndpoint = spy();
  const statesEndpoint = spy();
  const stateAffiliationEndpoint = spy();
  const usersEndpoint = spy();
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
    app.get.calledWith('/open-api', match.func),
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
