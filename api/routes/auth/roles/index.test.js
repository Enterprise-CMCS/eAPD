import tap from 'tap';
import { spy } from 'sinon';
import rolesIndex from './index.js';

tap.test('auth roles endpoint setup', async endpointTest => {
  const app = {};
  const getEndpoint = spy();

  rolesIndex(app, getEndpoint);

  endpointTest.ok(
    getEndpoint.calledWith(app),
    'roles GET endpoint is setup with the app'
  );
});
