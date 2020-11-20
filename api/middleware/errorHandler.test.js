/* eslint-disable no-shadow */
const sinon = require('sinon');
const tap = require('tap');

const errorHandler = require('./errorHandler');
const mockResponse = require('../util/mockResponse');

tap.test('errorHandler middleware', async t => {
  let err;
  let req;
  let res;
  let next;

  t.beforeEach(async () => {
    err = 'error';
    req = { id: 'unique id per request' };
    res = mockResponse();
    next = sinon.stub();
  });

  t.test('when an error occurs', async t => {
    errorHandler(err, req, res, next);
    t.ok(res.status.calledWith(500), 'HTTP status set to 500');
    t.ok(res.end.called, 'response is terminated');
  });

  t.test('when an error occurs after headers have been sent', async t => {
    res.headersSent = true;
    errorHandler(err, req, res, next);
    t.ok(next.calledWith(err), 'let express handle the error');
  });

});
