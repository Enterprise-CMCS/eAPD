const tap = require('tap');
const sinon = require('sinon');

const sandbox = sinon.createSandbox();

const userModel = {
  where: sandbox.stub(),
  fetch: sandbox.stub()
};
const get = sandbox.stub();

const bcrypt = {
  compare: sandbox.stub()
};

const auth = require('./authenticate.js')(userModel, bcrypt);

tap.test('local authentication', async (authTest) => {
  const doneCallback = sandbox.spy();
  authTest.beforeEach((done) => {
    sandbox.resetBehavior();
    sandbox.resetHistory();
    userModel.where.returns({ where: userModel.where, fetch: userModel.fetch });
    done();
  });

  authTest.test('with a database error', async (errorTest) => {
    userModel.fetch.rejects();

    await auth('user', 'password', doneCallback);

    errorTest.ok(
      userModel.where.calledOnce,
      'one set of WHERE clauses is added'
    );
    errorTest.ok(
      userModel.where.calledWith({ email: 'user' }),
      'it is the WHERE we expect'
    );
    errorTest.ok(userModel.fetch.calledOnce, 'the query is executed one time');

    errorTest.ok(bcrypt.compare.notCalled, 'does not compare passwords');

    errorTest.equal(doneCallback.callCount, 1, 'called done callback once');
    errorTest.ok(
      doneCallback.calledWith(sinon.match.truthy),
      'got an error message'
    );
  });

  authTest.test('with no valid user', async (noUserTest) => {
    userModel.fetch.resolves();

    await auth('user', 'password', doneCallback);

    noUserTest.ok(
      userModel.where.calledOnce,
      'one set of WHERE clauses is added'
    );
    noUserTest.ok(
      userModel.where.calledWith({ email: 'user' }),
      'it is the WHERE we expect'
    );
    noUserTest.ok(userModel.fetch.calledOnce, 'the query is executed one time');

    noUserTest.ok(bcrypt.compare.notCalled, 'does not compare password');

    noUserTest.equal(doneCallback.callCount, 1, 'called done callback once');
    noUserTest.ok(doneCallback.calledWith(null, false), 'got a false user');
  });

  authTest.test('with invalid password', async (invalidTest) => {
    get.withArgs('email').returns('hello@world');
    get.withArgs('password').returns('test-password');
    get.withArgs('id').returns(57);
    userModel.fetch.resolves({ get });
    bcrypt.compare.resolves(false);

    await auth('user', 'password', doneCallback);

    invalidTest.ok(
      userModel.where.calledOnce,
      'one set of WHERE clauses is added'
    );
    invalidTest.ok(
      userModel.where.calledWith({ email: 'user' }),
      'it is the WHERE we expect'
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

  authTest.test('with a valid user', async (validTest) => {
    get.withArgs('email').returns('hello@world');
    get.withArgs('password').returns('test-password');
    get.withArgs('id').returns(57);
    userModel.fetch.resolves({ get });
    bcrypt.compare.resolves(true);

    await auth('user', 'password', doneCallback);

    validTest.ok(
      userModel.where.calledOnce,
      'one set of WHERE clauses is added'
    );
    validTest.ok(
      userModel.where.calledWith({ email: 'user' }),
      'it is the WHERE we expect'
    );
    validTest.ok(userModel.fetch.calledOnce, 'the query is executed one time');

    validTest.ok(bcrypt.compare.calledOnce, 'password is compared one time');
    validTest.ok(
      bcrypt.compare.calledWith('password', 'test-password'),
      'password is compared to database value'
    );

    validTest.equal(doneCallback.callCount, 1, 'called done callback once');
    validTest.ok(
      doneCallback.calledWith(null, { username: 'hello@world', id: 57 }),
      'did not get an error message, did get a user object'
    );
  });
});
