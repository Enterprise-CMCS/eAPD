const tap = require('tap'); // eslint-disable-line import/no-extraneous-dependencies
const request = require('request'); // eslint-disable-line import/no-extraneous-dependencies
const knex = require('knex');
const knexConfig = require('../knexfile');

const getFullPath = endpointPath =>
  `http://${process.env.API_HOST || 'localhost'}:${process.env.API_PORT ||
    process.env.PORT ||
    8000}${endpointPath}`;

const login = () =>
  new Promise((resolve, reject) => {
    const cookies = request.jar();
    request.post(
      getFullPath('/auth/login'),
      { jar: cookies, json: { username: 'em@il.com', password: 'password' } },
      (err, response) => {
        if (response.statusCode === 200) {
          return resolve(cookies);
        }
        return reject(new Error('Failed to login'));
      }
    );
  });

const db = () => {
  // tap runs each test file in its own process, which is awesome for
  // test isolation.  However, knex keeps connections open indefinitely
  // and only closes them on process exit.  So...  any tests that
  // instantiate a database will also need to trigger a process exit
  // when their tests are done.  By hooking the tap.teardown handler
  // here, we shouldn't have to do anything in the test files except
  // use THIS db creator.
  tap.teardown(() => {
    process.exit();
  });

  return knex(knexConfig[process.env.NODE_ENV]);
};

module.exports = {
  db,
  getFullPath,
  login
};
