const axios = require('axios');
const FormData = require('form-data');
const knex = require('knex');
const knexConfig = require('../knexfile');
const logger = require('../logger')('endpoint-utils');

const { API_HOST, API_PORT, PORT } = process.env;

const host = API_HOST || 'localhost';
const port = API_PORT || PORT || 8000;

const baseURL = `http://${host}:${port}`;

const axiosDefaults = {
  baseURL,
  validateStatus: status => status < 500
};

const api = axios.create(axiosDefaults);

const apiKeyAuth = token => {
  const ip = token || '127.0.0.1';
  const options = {
    ...axiosDefaults,
    headers: {
      'x-forwarded-for': ip
    }
  };
  return axios.create(options);
};

const login = token => {
  const jwt = token || 'all-permissions';
  const options = {
    ...axiosDefaults,
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  };
  return axios.create(options);
};

const unauthenticatedTest = (method, url) => {
  it('when unauthenticated', async () => {
    const response = await api[method](url);
    expect(response.status).toEqual(401);
  });
};

const unauthorizedTest = (method, url) => {
  it('when unauthorized', async () => {
    const authenticatedClient = login('no-permissions');
    const response = await authenticatedClient[method](url);
    expect(response.status).toEqual(403);
  });
};

const getDB = () => knex(knexConfig[process.env.NODE_ENV]);

const setupDB = async db => {
  await db.seed.run({ specific: 'main.js' });
};

const teardownDB = async db => {
  await db.destroy();
  logger.verbose('Database teardown complete.');
};

const buildForm = data => {
  const form = new FormData();
  Object.entries(data).forEach(([key, value]) => form.append(key, value));
  return form;
};

module.exports = {
  api,
  buildForm,
  getDB,
  setupDB,
  teardownDB,
  apiKeyAuth,
  login,
  unauthenticatedTest,
  unauthorizedTest
};
