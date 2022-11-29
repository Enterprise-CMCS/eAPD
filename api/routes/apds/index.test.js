import tap from 'tap';
import { spy } from 'sinon';
import apdsIndex from './index.js';

tap.test('apds endpoint setup', async endpointTest => {
  const app = {};
  const deleteEndpoint = spy();
  const filesEndpoints = spy();
  const eventsEndpoints = spy();
  const getEndpoint = spy();
  const patchEndpoint = spy();
  const postEndpoint = spy();

  apdsIndex(app, {
    deleteEndpoint,
    filesEndpoints,
    eventsEndpoints,
    getEndpoint,
    patchEndpoint,
    postEndpoint
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
});
