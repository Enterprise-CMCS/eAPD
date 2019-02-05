const jwt = require('jsonwebtoken');
const tap = require('tap');
const sinon = require('sinon');
const lib = require('./authenticate.js');

const sandbox = sinon.createSandbox();

const userModel = {
  query: sandbox.stub(),
  fetch: sandbox.stub()
};
const get = sandbox.stub();

const bcrypt = {
  compare: sandbox.stub()
};

const auth = lib(userModel, bcrypt);

tap.test('local authentication', async authTest => {
  const doneCallback = sandbox.spy();
  authTest.beforeEach(done => {
    sandbox.resetBehavior();
    sandbox.resetHistory();
    userModel.query.returns({ query: userModel.query, fetch: userModel.fetch });
    done();
  });

  authTest.test('gets a nonce', async test => {
    const nonce = lib.getNonce('Alf');

    test.ok(
      /[^.]+\.[^.]+\.[^.]+/i.test(nonce),
      'nonce has header, payload, and signature'
    );

    const decoded = jwt.decode(nonce, { complete: true });
    test.same(
      decoded.header,
      { alg: 'HS256', typ: 'JWT' },
      'decoded token header is correct'
    );

    test.equal(decoded.payload.username, 'Alf', 'payload is the username');
    test.equal(
      typeof decoded.payload.iat,
      'number',
      'creation time is a number'
    );
    // JWT times are in seconds, not milliseconds.  Because reasons. 🤷🏼‍♂️
    test.equal(
      decoded.payload.exp,
      decoded.payload.iat + 3,
      'expiration is 3 seconds after the creation time'
    );

    test.equal(typeof decoded.signature, 'string', 'signature is a string');
  });

  authTest.test('with an invalid nonce', async nonceTests => {
    nonceTests.test('invalid jwt', async test => {
      await auth('', '', doneCallback);

      test.ok(
        userModel.fetch.notCalled,
        'never get as far as querying the database'
      );
      test.ok(doneCallback.calledWith(null, false), 'got a false user');
    });

    nonceTests.test('invalid signature', async test => {
      const nonce = lib.getNonce('username');
      await auth(nonce.substr(1), '', doneCallback);

      test.ok(
        userModel.fetch.notCalled,
        'never get as far as querying the database'
      );
      test.ok(doneCallback.calledWith(null, false), 'got a false user');
    });

    nonceTests.test('expired nonce', async test => {
      const clock = sinon.useFakeTimers();
      const nonce = lib.getNonce('username');
      clock.tick(3001);

      await auth(nonce, '', doneCallback);

      test.ok(
        userModel.fetch.notCalled,
        'never get as far as querying the database'
      );
      test.ok(doneCallback.calledWith(null, false), 'got a false user');

      clock.restore();
    });
  });

  authTest.test('with a database error', async errorTest => {
    userModel.fetch.rejects();

    await auth(lib.getNonce('user'), 'password', doneCallback);

    errorTest.ok(
      userModel.query.calledOnce,
      'one set of QUERY clauses is added'
    );
    errorTest.ok(
      userModel.query.calledWith('whereRaw', 'LOWER(email) = ?', ['user']),
      'it is the QUERY we expect'
    );
    errorTest.ok(userModel.fetch.calledOnce, 'the query is executed one time');

    errorTest.ok(bcrypt.compare.notCalled, 'does not compare passwords');

    errorTest.equal(doneCallback.callCount, 1, 'called done callback once');
    errorTest.ok(
      doneCallback.calledWith(sinon.match.truthy),
      'got an error message'
    );
  });

  authTest.test('with no valid user', async noUserTest => {
    userModel.fetch.resolves();

    await auth(lib.getNonce('user'), 'password', doneCallback);

    noUserTest.ok(
      userModel.query.calledOnce,
      'one set of QUERY clauses is added'
    );
    noUserTest.ok(
      userModel.query.calledWith('whereRaw', 'LOWER(email) = ?', ['user']),
      'it is the QUERY we expect'
    );
    noUserTest.ok(userModel.fetch.calledOnce, 'the query is executed one time');

    noUserTest.ok(bcrypt.compare.notCalled, 'does not compare password');

    noUserTest.equal(doneCallback.callCount, 1, 'called done callback once');
    noUserTest.ok(doneCallback.calledWith(null, false), 'got a false user');
  });

  authTest.test('with invalid password', async invalidTest => {
    get.withArgs('email').returns('hello@world');
    get.withArgs('password').returns('test-password');
    get.withArgs('id').returns(57);
    userModel.fetch.resolves({ get });
    bcrypt.compare.resolves(false);

    await auth(lib.getNonce('user'), 'password', doneCallback);

    invalidTest.ok(
      userModel.query.calledOnce,
      'one set of QUERY clauses is added'
    );
    invalidTest.ok(
      userModel.query.calledWith('whereRaw', 'LOWER(email) = ?', ['user']),
      'it is the QUERY we expect'
    );
    invalidTest.ok(
      userModel.fetch.calledOnce,
      'the query is executed one time'
    );

    invalidTest.ok(bcrypt.compare.calledOnce, 'password is compared one time');
    invalidTest.ok(
      bcrypt.compare.calledWith('password', 'test-password'),
      'password is compared to database value'
    );

    invalidTest.equal(doneCallback.callCount, 1, 'called done callback once');
    invalidTest.ok(doneCallback.calledWith(null, false), 'got a false user');
  });

  authTest.test('with a valid user', async validTest => {
    get.withArgs('email').returns('hello@world');
    get.withArgs('password').returns('test-password');
    get.withArgs('id').returns(57);
    get.withArgs('auth_role').returns('do a barrel role');
    get.withArgs('state_id').returns('liquid');

    const model = {
      activities: sinon.stub().resolves('play fetch'),
      get
    };
    userModel.fetch.resolves(model);
    bcrypt.compare.resolves(true);

    await auth(lib.getNonce('user'), 'password', doneCallback);

    validTest.ok(
      userModel.query.calledOnce,
      'one set of QUERY clauses is added'
    );
    validTest.ok(
      userModel.query.calledWith('whereRaw', 'LOWER(email) = ?', ['user']),
      'it is the QUERY we expect'
    );
    validTest.ok(userModel.fetch.calledOnce, 'the query is executed one time');

    validTest.ok(bcrypt.compare.calledOnce, 'password is compared one time');
    validTest.ok(
      bcrypt.compare.calledWith('password', 'test-password'),
      'password is compared to database value'
    );

    validTest.equal(doneCallback.callCount, 1, 'called done callback once');
    validTest.ok(
      doneCallback.calledWith(null, {
        username: 'hello@world',
        id: 57,
        role: 'do a barrel role',
        state: 'liquid',
        activities: 'play fetch',
        model
      }),
      'did not get an error message, did get a user object'
    );
  });
});
