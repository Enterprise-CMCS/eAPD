/* eslint-disable no-shadow */
const sinon = require('sinon');
const tap = require('tap');

const errorHandler = require('./errorHandler');
const mockResponse = require('../util/mockResponse');

let err;
let req;
let res;
let next;

tap.test('errorHandler middleware', async t => {
  t.beforeEach(async () => {
    req = { id: 'unique id per request' };
    res = mockResponse();
    next = sinon.stub();
  });

  t.test('when an error occurs', async t => {
    err = 'error';
    errorHandler(err, req, res, next);
    t.ok(res.status.calledWith(400), 'HTTP status set to 500');
    t.ok(res.end.called, 'response is terminated');
  });

  t.test('when an error occurs, and status is set', async t => {
    err = { error: 'err0r', status: 422 };
    errorHandler(err, req, res, next);
    t.ok(res.status.calledWith(422), 'HTTP status set to err.status');
    t.ok(res.end.called, 'response is terminated');
  });

  t.test('when an error occurs after headers have been sent', async t => {
    res.headersSent = true;
    errorHandler(err, req, res, next);
    t.ok(next.calledWith(err), 'let express handle the error');
  });
});
