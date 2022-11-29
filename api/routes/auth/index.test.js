import tap from 'tap';
import { spy } from 'sinon';
import apdsIndex from './index.js';

tap.test('auth endpoint setup', async endpointTest => {
  const app = {};
  const activitiesEndpoint = spy();
  const rolesEndpoint = spy();
  const statesEndpoint = spy();
  const certificationsEndpoint = spy();

  apdsIndex(
    app,
    activitiesEndpoint,
    rolesEndpoint,
    statesEndpoint,
    certificationsEndpoint
  );

  endpointTest.ok(
    activitiesEndpoint.calledWith(app),
    'auth activities endpoints are setup with the app'
  );
  endpointTest.ok(
    rolesEndpoint.calledWith(app),
    'auth roles endpoints are setup with the app'
  );
  endpointTest.ok(
    statesEndpoint.calledWith(app),
    'auth states endpoints are setup with the app'
  );
  endpointTest.ok(
    certificationsEndpoint.calledWith(app),
    'auth certifications endpoints are setup with the app'
  );
});
