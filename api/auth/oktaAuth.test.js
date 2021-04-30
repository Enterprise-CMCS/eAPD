const sinon = require('sinon');
const tap = require('tap');

const {
  userApplicationProfileUrl,
  actualCallOktaEndpoint: callOktaEndpoint,
  actualVerifyJWT: verifyJWT
} = require('./oktaAuth');

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

  oktaTests.test('call Okta endpoint', async callOktaEndpointTest => {
    const client = {
      http: {
        http: sandbox.stub()
      }
    };
    const jsonResponse = {
      status: 'ACTIVE',
      credentials: { userName: 'test@email.com' },
      json: sandbox.stub()
    };

    callOktaEndpointTest.test('testing GET endpoint', async test => {
      client.http.http.resolves(jsonResponse);
      jsonResponse.json.resolves({
        profile: {
          name: 'Regular User'
        }
      });

      const { data } = await callOktaEndpoint('/endpoint', { client });
      test.same(data, {
        profile: {
          name: 'Regular User'
        }
      });
    });

    callOktaEndpointTest.test(
      'testing GET endpoint, failed json',
      async test => {
        client.http.http.resolves(jsonResponse);
        jsonResponse.json.rejects({
          error: 'JSON failed'
        });

        const { data } = await callOktaEndpoint('/endpoint', { client });
        test.equal(data, null);
      }
    );

    callOktaEndpointTest.test(
      'testing GET endpoint, http failed',
      async test => {
        client.http.http.rejects({ error: 'http failed' });

        const { data } = await callOktaEndpoint('/endpoint', { client });
        test.equal(data, null);
        test.equal(jsonResponse.json.callCount, 0);
      }
    );

    callOktaEndpointTest.test(
      'testing POST endpoint, with body',
      async test => {
        client.http.http.resolves(jsonResponse);
        jsonResponse.json.resolves({
          profile: {
            name: 'Regular User'
          }
        });

        const { data } = await callOktaEndpoint('/endpoint', {
          method: 'POST',
          body: { test: 'value' },
          client
        });
        test.same(data, {
          profile: {
            name: 'Regular User'
          }
        });
      }
    );

    callOktaEndpointTest.test('testing POST endpoint, no body', async test => {
      client.http.http.resolves(jsonResponse);
      jsonResponse.json.resolves({
        profile: {
          name: 'Regular User'
        }
      });

      const { data } = await callOktaEndpoint('/endpoint', {
        method: 'POST',
        client
      });
      test.same(data, {
        profile: {
          name: 'Regular User'
        }
      });
    });
  });

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
