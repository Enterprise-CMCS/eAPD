const tap = require('tap'); // eslint-disable-line import/no-extraneous-dependencies
const request = require('request'); // eslint-disable-line import/no-extraneous-dependencies
const knex = require('knex');
const knexConfig = require('../knexfile');

const getFullPath = endpointPath =>
  `http://${process.env.API_HOST || 'localhost'}:${process.env.API_PORT ||
    process.env.PORT ||
    8000}${endpointPath}`;

const get = async (...args) =>
  new Promise(resolve => {
    request.get(...args, (err, response, body) => {
      resolve({ err, response, body });
    });
  });

const post = async (...args) =>
  new Promise(resolve => {
    request.post(...args, (err, response, body) => {
      resolve({ err, response, body });
    });
  });

const login = async () => {
  const cookies = request.jar();

  const { response } = await post(getFullPath('/auth/login'), {
    jar: cookies,
    json: { username: 'em@il.com', password: 'password' }
  });

  if (response.statusCode === 200) {
    return cookies;
  }
  throw new Error('Failed to login');
};

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
  request: { get, post, jar: request.jar },
  getFullPath,
  login
};
