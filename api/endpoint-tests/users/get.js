const tap = require('tap'); // eslint-disable-line import/no-extraneous-dependencies
const request = require('request'); // eslint-disable-line import/no-extraneous-dependencies
const getFullPath = require('../utils').getFullPath;
const login = require('../utils').login;

tap.test('users endpoint | GET /users', getUsersTest => {
  const url = getFullPath('/users');

  getUsersTest.test('when unauthenticated', unauthenticatedTest => {
    request.get(url, (err, response, body) => {
      unauthenticatedTest.equal(
        response.statusCode,
        403,
        'gives a 403 status code'
      );
      unauthenticatedTest.notOk(body, 'does not send a body');
      unauthenticatedTest.done();
    });
  });

  getUsersTest.test('when authenticated', validTest => {
    login().then(cookies => {
      request.get(url, { jar: cookies, json: true }, (err, response, body) => {
        validTest.equal(response.statusCode, 200, 'gives a 200 status code');
        validTest.same(
          body,
          [{ id: 57, email: 'em@il.com' }],
          'returns an array of known users'
        );
        validTest.done();
      });
    });
  });

  getUsersTest.done();
});

tap.test('users endpoint | GET /user/:userID', getUserTest => {
  const url = getFullPath('/user');

  getUserTest.test('when unauthenticated', unauthenticatedTests => {
    [
      { name: 'when requesting an invalid user ID', id: 'random-id' },
      { name: 'when requesting a non-existing user ID', id: 500 },
      { name: 'when requesting a valid user ID', id: 57 }
    ].forEach(situation => {
      unauthenticatedTests.test(situation.name, unauthentedTest => {
        request.get(`${url}/${situation.id}`, (err, response, body) => {
          unauthentedTest.equal(
            response.statusCode,
            403,
            'gives a 403 status code'
          );
          unauthentedTest.notOk(body, 'does not send a body');
          unauthentedTest.done();
        });
      });
    });

    unauthenticatedTests.done();
  });

  getUserTest.test('when authenticated', authenticatedTests => {
    authenticatedTests.test(
      'when requesting an invalid user ID',
      invalidTest => {
        login().then(cookies => {
          request.get(
            `${url}/random-id`,
            { jar: cookies, json: true },
            (err, response, body) => {
              invalidTest.equal(
                response.statusCode,
                400,
                'gives a 400 status code'
              );
              invalidTest.same(
                body,
                { error: 'get-user-invalid' },
                'sends a token indicating the failure'
              );
              invalidTest.done();
            }
          );
        });
      }
    );

    authenticatedTests.test(
      'when requesting a non-existant user ID',
      invalidTest => {
        login().then(cookies => {
          request.get(
            `${url}/500`,
            { jar: cookies, json: true },
            (err, response, body) => {
              invalidTest.equal(
                response.statusCode,
                404,
                'gives a 404 status code'
              );
              invalidTest.notOk(body, 'does not send a body');
              invalidTest.done();
            }
          );
        });
      }
    );

    authenticatedTests.test('when requesting a valid user ID', validTest => {
      login().then(cookies => {
        request.get(
          `${url}/57`,
          { jar: cookies, json: true },
          (err, response, body) => {
            validTest.equal(
              response.statusCode,
              200,
              'gives a 200 status code'
            );
            validTest.same(
              body,
              { id: 57, email: 'em@il.com' },
              'returns an object for the requested user'
            );
            validTest.done();
          }
        );
      });
    });

    authenticatedTests.done();
  });

  getUserTest.done();
});
