const tap = require('tap'); // eslint-disable-line import/no-extraneous-dependencies
const request = require('request'); // eslint-disable-line import/no-extraneous-dependencies
const knex = require('knex');
const knexConfig = require('../knexfile');

const getFullPath = endpointPath =>
  `http://${process.env.API_HOST || 'localhost'}:${process.env.API_PORT ||
    process.env.PORT ||
    8000}${endpointPath}`;

const execRequest = async (method, ...args) =>
  new Promise(resolve => {
    request[method](...args, (err, response, body) => {
      resolve({ err, response, body });
    });
  });
const requestFor = method => (...args) => execRequest(method, ...args);

const login = async (
  username = 'all-permissions-and-state',
  password = 'password'
) => {
  const cookies = request.jar();

  const { response } = await execRequest('post', getFullPath('/auth/login'), {
    jar: cookies,
    json: { username, password }
  });

  if (response.statusCode === 200) {
    return cookies;
  }
  throw new Error('Failed to login');
};

const unauthenticatedTest = (method, url, test) => {
  test.test('when unauthenticated', async invalidTest => {
    const { response: { statusCode }, body } = await requestFor(method)(url);

    invalidTest.equal(statusCode, 403, 'gives a 403 status code');
    invalidTest.notOk(body, 'does not send a body');
  });
};

const unauthorizedTest = (method, url, test) => {
  test.test('with unauthorized', async invalidTest => {
    const jar = await login('no-permissions', 'password'); // this user has no permissions
    const { response: { statusCode }, body } = await requestFor(method)(url, {
      jar
    });

    invalidTest.equal(statusCode, 401, 'gives a 401 status code');
    invalidTest.notOk(body, 'does not send a body');
  });
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
  request: {
    delete: requestFor('delete'),
    get: requestFor('get'),
    post: requestFor('post'),
    put: requestFor('put'),
    jar: request.jar
  },
  getFullPath,
  login,
  unauthenticatedTest,
  unauthorizedTest
};
