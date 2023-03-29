import axios from 'axios';
import FormData from 'form-data';
import knex from 'knex';
import knexConfig from '../knexfile.js';
import loggerFactory from '../logger/index.js';

import {
  setup as setupMongo,
  teardown as teardownMongo
} from '../db/mongodb.js';

const logger = loggerFactory('endpoint-utils');

const { API_HOST, API_PORT, PORT } = process.env;

const host = API_HOST || 'localhost';
const port = API_PORT || PORT || 8000;

const baseURL = `http://${host}:${port}`;

const axiosDefaults = {
  baseURL,
  timeout: 3000,
  validateStatus: status => status < 500
};

const apiKeyHeader = token => {
  const options = {
    ...axiosDefaults
  };
  if (token) {
    options.headers = {
      apikey: token
    };
  }
  return axios.create(options);
};

export const apiNoKey = apiKeyHeader();
export const apiKeyAuth = apiKeyHeader('apikey');

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

export const apiAllPermissions = login('all-permissions');
export const apiAsFedAdmin = login('fed-admin');
export const apiAsStateAdmin = login('state-admin');
export const apiAsStateStaff = login('state-staff');
export const apiNoPermissionsNoState = login('all-permissions-no-state');
export const apiNoPermissions = login('no-permissions');
export const apiNoAuth = axios.create(axiosDefaults);

export const unauthenticatedTest = (method, url) => {
  it('when unauthenticated', async () => {
    const response = await apiNoAuth[method](url);
    expect(response.status).toEqual(401);
  });
};

export const unauthorizedTest = (method, url) => {
  it('when unauthorized', async () => {
    const response = await apiNoPermissions[method](url);
    expect(response.status).toEqual(403);
  });
};

export const getDB = () => knex(knexConfig[process.env.NODE_ENV]);

export const setupDB = async db => {
  await db.seed.run({ specific: 'main.js' });
  await teardownMongo();
  await setupMongo();
};

export const teardownDB = async db => {
  await db.destroy();
  await teardownMongo();
  logger.verbose('Database teardown complete.');
};

export const buildForm = data => {
  const form = new FormData();
  Object.entries(data).forEach(([key, value]) => form.append(key, value));
  return form;
};
