import tap from 'tap';
import sinon from 'sinon';
import rolesIndex from './index';

tap.test('auth roles endpoint setup', async endpointTest => {
  const app = {};
  const getEndpoint = sinon.spy();

  rolesIndex(app, getEndpoint);

  endpointTest.ok(
    getEndpoint.calledWith(app),
    'roles GET endpoint is setup with the app'
  );
});
