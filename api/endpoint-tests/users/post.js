const tap = require('tap'); // eslint-disable-line import/no-extraneous-dependencies
const request = require('request'); // eslint-disable-line import/no-extraneous-dependencies
const { getFullPath, login } = require('../utils');

tap.test('users endpoint | POST /user', postUsersTest => {
  const url = getFullPath('/user');

  const invalidCases = [
    {
      name: 'with no body'
    },
    {
      name: 'with an invalid body',
      body: { hello: 'world' }
    },
    {
      name: 'with an email but no password',
      body: { email: 'newuser@email.com' }
    },
    {
      name: 'with a password but no email',
      body: { password: 'newpassword' }
    }
  ];

  postUsersTest.test('when unauthenticated', unauthenticatedTests => {
    [
      ...invalidCases,
      {
        name: 'with a valid body',
        body: { email: 'newuser@email.com', password: 'newpassword' }
      }
    ].forEach(situation => {
      unauthenticatedTests.test(situation.name, unauthenticatedTest => {
        request.post(url, { json: situation.body }, (err, response, body) => {
          unauthenticatedTest.equal(
            response.statusCode,
            403,
            'gives a 403 status code'
          );
          unauthenticatedTest.notOk(body, 'does not send a body');
          unauthenticatedTest.done();
        });
      });
    });
    unauthenticatedTests.done();
  });

  postUsersTest.test('when authenticated', authenticatedTests => {
    login().then(cookies => {
      invalidCases.forEach(situation => {
        authenticatedTests.test(situation.name, invalidTest => {
          request.post(
            url,
            { jar: cookies, json: situation.body || true },
            (err, response, body) => {
              invalidTest.equal(
                response.statusCode,
                400,
                'gives a 400 status code'
              );
              invalidTest.same(
                body,
                { error: 'add-user-invalid' },
                'sends a token indicating the failure'
              );
              invalidTest.done();
            }
          );
        });
      });

      authenticatedTests.test('with existing email address', invalidTest => {
        request.post(
          url,
          { jar: cookies, json: { email: 'em@il.com', password: 'anything' } },
          (err, response, body) => {
            invalidTest.equal(
              response.statusCode,
              400,
              'gives a 400 status code'
            );
            invalidTest.same(
              body,
              { error: 'add-user-email-exists' },
              'sends a token indicating the failure'
            );
            invalidTest.done();
          }
        );
      });

      authenticatedTests.test('with a valid new user', validTest => {
        request.post(
          url,
          {
            jar: cookies,
            json: { email: 'newuser@email.com', password: 'newpassword' }
          },
          (err, response, body) => {
            validTest.equal(
              response.statusCode,
              200,
              'gives a 200 status code'
            );
            validTest.notOk(body, 'does not send a body');
            validTest.done();
          }
        );
      });

      authenticatedTests.done();
    });
  });

  postUsersTest.done();
});
