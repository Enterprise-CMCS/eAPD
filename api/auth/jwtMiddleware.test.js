/* eslint-disable no-shadow */
import tap from 'tap';

import sinon from 'sinon';
import jwtMiddleware from './jwtMiddleware';

const sandbox = sinon.createSandbox();

tap.test('jwtMiddleware', async t => {
  const res = {
    send: sandbox.stub(),
    status: sandbox.stub(),
    end: sandbox.spy(),
    cookie: sandbox.spy()
  };

  const next = sandbox.spy();

  const user = { name: 'dude' };

  t.afterEach(async () => {
    sandbox.resetHistory();
  });

  t.test('given a valid authorization header', async t => {
    const req = { headers: { Authorization: 'Bearer xxx.yyy.zzz' } };
    const extractor = () => 'xxx.yyy.zzz';
    const verifyToken = () => user;
    await jwtMiddleware(req, res, next, {
      extractor,
      verifyToken
    });
    t.equal(req.user, user, 'attaches the user object to the request');
    t.equal(res.cookie.notCalled, true, 'was not called');
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
    const verifyToken = () => null;
    await jwtMiddleware(req, res, next, {
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
    t.equal(getUserByID.callCount, 0, 'getUserByID was not called');
    t.ok(next.calledOnce, 'calls the next middleware function');
  });
});
