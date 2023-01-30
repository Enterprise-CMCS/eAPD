/* eslint-disable no-shadow, global-require */
import request from 'supertest';

import tap from 'tap';
import { stub } from 'sinon';
import * as mongo from './db/mongodb.js';
import knex from './db/knex.js';
import api from './api.js';

stub(mongo, 'setup').returns({});
stub(mongo, 'getConnectionStatus').returns('connected');

let response;
let testDbHost;

tap.test('express api', async t => {
  t.test('GET /heartbeat', async test => {
    response = await request(api).get('/heartbeat');
    test.equal(response.status, 204, 'HTTP status set to 204');
  });

  t.test('GET /api-docs', async t => {
    response = await request(api).get('/api-docs');
    t.equal(response.status, 301, 'successful');
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
