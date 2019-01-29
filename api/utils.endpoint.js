const request = require('request'); // eslint-disable-line import/no-extraneous-dependencies
const knex = require('knex');
const knexConfig = require('./knexfile');

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

const unauthenticatedTest = (method, url) =>
  it('when unauthenticated', async () => {
    const { response: { statusCode }, body } = await requestFor(method)(url);

    expect(statusCode).toEqual(403);
    expect(body).toBeFalsy();
  });

const unauthorizedTest = (method, url) => {
  it('with unauthorized', async () => {
    const jar = await login('no-permissions', 'password'); // this user has no permissions
    const { response: { statusCode }, body } = await requestFor(method)(url, {
      jar
    });

    expect(statusCode).toEqual(401);
    expect(body).toBeFalsy();
  });
};

const getDB = () => knex(knexConfig[process.env.NODE_ENV]);

module.exports = {
  getDB,
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
