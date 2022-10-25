/* eslint-disable no-shadow, global-require */
const request = require('supertest');
const tap = require('tap');
const sinon = require('sinon');
const mongo = require('./db/mongodb');
const knex = require('./db/knex');

sinon.stub(mongo, 'setup').returns({});
sinon.stub(mongo, 'getConnectionStatus').returns('connected');

let api;
let response;
let testDbHost;

tap.test('express api', async t => {
  t.beforeEach(async () => {
    api = require('./api');
  });

  t.test('GET /heartbeat', async test => {
    response = await request(api).get('/heartbeat');
    test.equal(response.status, 204, 'HTTP status set to 204');
  });

  t.test('GET /api-docs', async t => {
    response = await request(api).get('/api-docs');
    t.equals(response.status, 301, 'successful');
  });

  t.test('headers', async test => {
    response = await request(api).get('/');
    test.notOk(response.header['x-powered-by'], 'X-Powered-By header is unset');
    test.equal(
      response.header['cache-control'],
      'private, no-cache',
      'Cache-Control header is set'
    );
    test.ok(
      response.header['strict-transport-security'],
      'Strict-Transport-Security header is set'
    );
    test.equal(
      response.header['x-content-type-options'],
      'nosniff',
      'X-Content-Type-Options header is set'
    );
    test.equal(
      response.header['x-frame-options'],
      'sameorigin',
      'X-Frame-Options is set'
    );
    test.equal(
      response.header['x-xss-protection'],
      '1; mode=block',
      'X-XSS-Protection is set'
    );
  });

  t.test('error handling', async errorTests => {
    // disconnect database from api via environment
    errorTests.beforeEach(async () => {
      testDbHost = process.env.TEST_DB_HOST;
      process.env.TEST_DB_HOST = 'undefined';
      await knex.destroy();
      api = require('./api');
    });

    errorTests.test(
      'GET /states without a database connection returns 500',
      async connTests => {
        const res = await request(api).get('/states');
        connTests.equal(res.status, 400, 'HTTP status set to 500');
      }
    );

    errorTests.teardown(async () => {
      // reattach database
      process.env.TEST_DB_HOST = testDbHost;
      await knex.destroy();
    });
  });
});
