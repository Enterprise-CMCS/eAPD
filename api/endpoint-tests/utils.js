import axios from 'axios';
import FormData from 'form-data';
import knex from 'knex';
import knexConfig from '../knexfile.js';
import loggerFactory from '../logger/index.js';

const logger = loggerFactory('endpoint-utils');

const { API_HOST, API_PORT, PORT } = process.env;

const host = API_HOST || 'localhost';
const port = API_PORT || PORT || 8000;

const baseURL = `http://${host}:${port}`;

const axiosDefaults = {
  baseURL,
  validateStatus: status => status < 500
};

export const api = axios.create(axiosDefaults);

export const apiKeyAuth = token => {
  const ip = token || '10.0.0.0';
  const options = {
    ...axiosDefaults,
    headers: {
      'x-forwarded-for': ip
    }
  };
  return axios.create(options);
};

export const login = token => {
  const jwt = token || 'all-permissions';
  const options = {
    ...axiosDefaults,
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  };
  return axios.create(options);
};

export const unauthenticatedTest = (method, url) => {
  it('when unauthenticated', async () => {
    const response = await api[method](url);
    expect(response.status).toEqual(401);
  });
};

export const unauthorizedTest = (method, url) => {
  it('when unauthorized', async () => {
    const authenticatedClient = login('no-permissions');
    const response = await authenticatedClient[method](url);
    expect(response.status).toEqual(403);
  });
};

export const getDB = () => knex(knexConfig[process.env.NODE_ENV]);

export const setupDB = async db => {
  await db.seed.run({ specific: 'main.js' });
};

export const teardownDB = async db => {
  await db.destroy();
  logger.verbose('Database teardown complete.');
};

export const buildForm = data => {
  const form = new FormData();
  Object.entries(data).forEach(([key, value]) => form.append(key, value));
  return form;
};
