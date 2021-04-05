/* eslint-disable no-shadow, global-require */
const request = require('supertest');
const tap = require('tap');

let api;
let response;
let testDbHost;

tap.test('express api', async t => {
  t.beforeEach(async () => {
    api = require('./api');
  });

  t.test('GET /heartbeat', async t => {
    response = await request(api).get('/heartbeat');
    t.equals(response.status, 204, 'HTTP status set to 204');
  });

  // t.test('GET /api-docs', async t => {
  //   response = await request(api).get('/api-docs');
  //   t.equals(response.status, 301, 'successful');
  // });

  t.test('headers', async t => {
    response = await request(api).get('/');
    t.notOk(response.header['x-powered-by'], 'X-Powered-By header is unset');
    t.equals(
      response.header['cache-control'],
      'private, no-cache',
      'Cache-Control header is set'
    );
    t.ok(
      response.header['strict-transport-security'],
      'Strict-Transport-Security header is set'
    );
    t.equals(
      response.header['x-content-type-options'],
      'nosniff',
      'X-Content-Type-Options header is set'
    );
    t.equals(
      response.header['x-frame-options'],
      'sameorigin',
      'X-Frame-Options is set'
    );
    t.equals(
      response.header['x-xss-protection'],
      '1; mode=block',
      'X-XSS-Protection is set'
    );
  });

  t.test('error handling', async t => {
    // disconnect database from api via environment
    t.beforeEach(async () => {
      testDbHost = process.env.TEST_DB_HOST;
      process.env.TEST_DB_HOST = 'undefined';
      api = require('./api');
    });

    // reattach database
    t.afterEach(async () => {
      process.env.TEST_DB_HOST = testDbHost;
    });

    t.test('GET /states without a database connection returns 500', async t => {
      const response = await request(api).get('/states');
      t.equals(response.status, 500, 'HTTP status set to 500');
    });
  });
});
