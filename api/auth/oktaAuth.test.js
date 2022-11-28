import sinon from 'sinon';
import tap from 'tap';

import {
  userApplicationProfileUrl,
  actualVerifyJWT as verifyJWT
} from './oktaAuth';

const { OKTA_CLIENT_ID } = process.env;

tap.test('okta wrappers', async oktaTests => {
  const sandbox = sinon.createSandbox();

  oktaTests.beforeEach(async () => {
    sandbox.resetBehavior();
    sandbox.resetHistory();
  });

  oktaTests.test(
    'get user application profile url',
    async userApplicationProfileUrlTest => {
      userApplicationProfileUrlTest.test(
        'retrieve url with valid user id',
        async test => {
          const url = userApplicationProfileUrl('user_id');

          test.equal(url, `/api/v1/apps/${OKTA_CLIENT_ID}/users/user_id`);
        }
      );

      userApplicationProfileUrlTest.test(
        'retrieve url with invalid user id',
        async test => {
          const url = userApplicationProfileUrl();

          test.equal(url, `/api/v1/apps/${OKTA_CLIENT_ID}/users/undefined`);
        }
      );
    }
  );

  oktaTests.test('verify web token', async verifierTest => {
    const oktaVerifier = {
      verifyAccessToken: sandbox.stub()
    };
    verifierTest.test('valid token', async test => {
      oktaVerifier.verifyAccessToken.resolves({
        claims: {
          sub: 'test@email.com',
          test: 'value'
        }
      });
      const claims = await verifyJWT('token', { verifier: oktaVerifier });
      test.same(claims, {
        sub: 'test@email.com',
        test: 'value'
      });
    });

    verifierTest.test('valid token', async test => {
      oktaVerifier.verifyAccessToken.rejects({
        error: 'invalid token'
      });
      const claims = await verifyJWT('token', { verifier: oktaVerifier });
      test.equal(claims, false);
    });
  });
});
