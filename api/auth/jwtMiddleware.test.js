/* eslint-disable no-shadow */
const tap = require('tap');
const sinon = require('sinon');
const jwtMiddleware = require('./jwtMiddleware');
const { signWebToken } = require('./jwtUtils');
const sandbox = sinon.createSandbox();

tap.test('jwtMiddleware', async t => {
  const res = {
    send: sandbox.stub(),
    status: sandbox.stub(),
    end: sandbox.spy()
  };

  const next = sandbox.spy();

  const user = { name: 'dude' };
  const payload = { sub: 'session-id' };
  const err = { message: 'fail!' };

  t.afterEach(async () => {
    sandbox.resetHistory();
  });

  t.test('given a valid authorization header', async t => {
    let req = { headers: { 'Authorization': 'Bearer xxx.yyy.zzz' } };
    const extractor = () => true;
    const deserialize = (sub, done) => { done(null, user) };
    const verifyToken = () => payload;
    await jwtMiddleware(req, res, next, { deserialize, extractor, verifyToken });
    t.equals(req.payload, payload, 'attaches the jwt payload to the request');
    t.equals(req.user, user, 'attaches the user object to the request');
    t.ok(next.calledOnce, 'calls the next middleware function');
  });

  t.test('given an invalid authorization header', async t => {
    let req = { headers: { 'Authorization': 'blah' } };
    const extractor = () => true;
    const deserialize = (sub, done) => { done(null, user) };
    const verifyToken = () => false;
    await jwtMiddleware(req, res, next, { deserialize, extractor, verifyToken });
    t.notOk(req.payload, 'req.payload is not present');
    t.notOk(req.user, 'req.user is not present');
    t.ok(next.calledOnce, 'calls the next middleware function');
  });

  t.test('cannot deserialize user', async t => {
    let req = { headers: { 'Authorization': 'blah' } };
    const extractor = () => true;
    const deserialize = (sub, done) => { done(err, null) };
    const verifyToken = () => payload;
    await jwtMiddleware(req, res, next, { deserialize, extractor, verifyToken });
    t.notOk(req.payload, 'req.payload is not present');
    t.notOk(req.user, 'req.user is not present');
    t.ok(res.status.calledWith(400), 'sets a 400 HTTP status');
    t.ok(res.send.calledWith(err), 'sends the error that occured when deserializing the user');
    t.ok(res.end.calledOnce, 'ends the response');
    t.ok(next.calledOnce, 'calls the next middleware function');
  });

});
