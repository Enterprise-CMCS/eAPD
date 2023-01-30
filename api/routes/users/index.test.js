import tap from 'tap';
import { spy } from 'sinon';
import usersIndex from './index.js';

tap.test('users endpoint setup', async endpointTest => {
  const app = {};
  const getEndpoint = spy();

  usersIndex(app, { getEndpoint });

  endpointTest.ok(
    getEndpoint.calledWith(app),
    'users GET endpoint is setup with the app'
  );
});
