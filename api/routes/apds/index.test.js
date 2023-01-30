import tap from 'tap';
import { spy } from 'sinon';
import apdsIndex from './index.js';

tap.test('apds endpoint setup', async endpointTest => {
  const app = {};
  const deleteEndpoint = spy();
  const getEndpoint = spy();
  const patchEndpoint = spy();
  const postEndpoint = spy();
  const filesEndpoints = spy();
  const eventsEndpoints = spy();
  const submissionsEndpoints = spy();

  apdsIndex(app, {
    deleteEndpoint,
    getEndpoint,
    patchEndpoint,
    postEndpoint,
    filesEndpoints,
    eventsEndpoints,
    submissionsEndpoints
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
    patchEndpoint.calledWith(app),
    'apds PATCH endpoint is setup with the app'
  );
  endpointTest.ok(
    postEndpoint.calledWith(app),
    'apds POST endpoint is setup with the app'
  );
  endpointTest.ok(
    filesEndpoints.calledWith(app),
    'apds files endpoints are setup with the app'
  );
  endpointTest.ok(
    eventsEndpoints.calledWith(app),
    'apds events endpoint are setup with the app'
  );
  endpointTest.ok(
    submissionsEndpoints.calledWith(app),
    'apds submissions endpoints are setup with the app'
  );
});
