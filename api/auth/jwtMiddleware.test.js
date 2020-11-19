/* eslint-disable no-shadow */
const tap = require('tap');
const sinon = require('sinon');
const jwtMiddleware = require('./jwtMiddleware');

const sandbox = sinon.createSandbox();

tap.test('jwtMiddleware', async t => {
  const res = {
    send: sandbox.stub(),
    status: sandbox.stub(),
    end: sandbox.spy()
  };

  const next = sandbox.spy();

  const user = { name: 'dude' };
  const payload = {
    uid: '1234'
  };

  t.afterEach(async () => {
    sandbox.resetHistory();
  });

  t.test('given a valid authorization header', async t => {
    const req = { headers: { Authorization: 'Bearer xxx.yyy.zzz' } };
    const extractor = () => true;
    const getUserByID = () => user;
    const verifyToken = () => payload;
    await jwtMiddleware(req, res, next, {
      getUserByID,
      extractor,
      verifyToken
    });
    t.equals(req.user, user, 'attaches the user object to the request');
    t.ok(next.calledOnce, 'calls the next middleware function');
  });

  t.test('given an invalid authorization header', async t => {
    const req = { headers: { Authorization: 'blah' } };
    const extractor = () => true;
    const getUserByID = () => user;
    const verifyToken = () => false;
    await jwtMiddleware(req, res, next, {
      getUserByID,
      extractor,
      verifyToken
    });
    t.notOk(req.user, 'req.user is not present');
    t.ok(next.calledOnce, 'calls the next middleware function');
  });

  t.test('cannot retrieve user', async t => {
    const req = { headers: { Authorization: 'blah' } };
    const extractor = () => true;
    const getUserByID = () => null;
    const verifyToken = () => payload;
    await jwtMiddleware(req, res, next, {
      getUserByID,
      extractor,
      verifyToken
    });
    t.notOk(req.user, 'req.user is not present');
    t.ok(next.calledOnce, 'calls the next middleware function');
  });

  t.test('error handling', async t => {
    const req = { headers: { Authorization: 'blah' } };
    const extractor = () => true;
    const getUserByID = sandbox.stub();
    const verifyToken = sandbox.stub();
    verifyToken.rejects({ error: 'invalid token' });
    await jwtMiddleware(req, res, next, {
      getUserByID,
      extractor,
      verifyToken
    });
    t.notOk(req.user, 'req.user is not present');
    t.equals(getUserByID.callCount, 0, 'getUserByID was not called');
    t.ok(next.calledOnce, 'calls the next middleware function');
  });
});
