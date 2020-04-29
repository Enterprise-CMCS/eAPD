const axios = require('axios');
const FormData = require('form-data');
const knex = require('knex');
const knexConfig = require('../knexfile');

const baseURL = () =>
  `http://${process.env.API_HOST || 'localhost'}:${process.env.API_PORT ||
    process.env.PORT ||
    8000}`;

const api = axios.create({
  baseURL: baseURL(),
  validateStatus: status => status < 500,
  withCredentials: true
});

const login = (
  username = 'all-permissions-and-state',
  password = 'password'
) => {
  return api
    .post('/auth/login/nonce', { username })
    .then(res => res.data.nonce)
    .then(nonce => api.post('/auth/login', { username: nonce, password }))
    .then(res => {
      if (res.status !== 200) return new Error('Failed to login', res);
      return res;
    })
    .catch(error => {
      console.error(error);
    });
};

const unauthenticatedTest = (method, url) =>
  it('when unauthenticated', async () => {
    const response = await api[method](url);
    expect(response.status).toEqual(403);
    expect(response.data).toBeFalsy();
  });

const unauthorizedTest = (method, url) => {
  it('with unauthorized', async () => {
    // this user has no permissions
    const response = await login('no-permissions', 'password').then(() =>
      api[method](url)
    );

    expect(response.status).toEqual(401);
    expect(response.data).toBeFalsy();
  });
};

const getDB = () => knex(knexConfig[process.env.NODE_ENV]);

const buildForm = data => {
  const form = new FormData();
  Object.entries(data).forEach(([key, value]) => form.append(key, value));
  return form;
};

module.exports = {
  api,
  buildForm,
  getDB,
  login,
  unauthenticatedTest,
  unauthorizedTest
};
