const tap = require('tap');
const sinon = require('sinon');

const userCreator = require('./user');

tap.test('user data model', async userModelTests => {
  const sandbox = sinon.createSandbox();
  userModelTests.beforeEach(async () => {
    sandbox.resetBehavior();
    sandbox.resetHistory();
  });

  const passwordChecker = sandbox.stub();
  const bcrypt = { hashSync: sandbox.stub() };

  const user = userCreator(passwordChecker, bcrypt);

  userModelTests.test('setup', async setupTests => {
    setupTests.match(
      user,
      {
        user: {
          tableName: 'users'
        }
      },
      'get the expected model definitions'
    );
    setupTests.type(
      user.user.role,
      'function',
      'creates a role relationship for the user model'
    );
    setupTests.type(
      user.user.state,
      'function',
      'creates a state relationship for the user model'
    );
    setupTests.type(
      user.user.activities,
      'function',
      'creates an activities relationship for the user model'
    );
    setupTests.type(
      user.user.apds,
      'function',
      'creates an apds relationship for the user model'
    );
  });

  userModelTests.test(
    'user model sets up role relationship',
    async roleTests => {
      const self = {
        hasOne: sinon.stub().returns('poptart')
      };

      const output = user.user.role.bind(self)();

      roleTests.ok(
        self.hasOne.calledWith('role', 'name', 'auth_role'),
        'sets up the relationship mapping to a role'
      );
      roleTests.equal(output, 'poptart', 'returns the expected value');
    }
  );

  userModelTests.test(
    'user model sets up state relationship',
    async stateTests => {
      const self = {
        hasOne: sinon.stub().returns('cali')
      };

      const output = user.user.state.bind(self)();

      stateTests.ok(
        self.hasOne.calledWith('state'),
        'sets up the relationship mapping to a state'
      );
      stateTests.equal(output, 'cali', 'returns the expected value');
    }
  );

  userModelTests.test('validation', async validationTests => {
    const self = {
      where: sandbox.stub(),
      fetchAll: sandbox.stub(),
      attributes: {},
      hasChanged: sandbox.stub(),
      set: sandbox.stub()
    };

    const validate = user.user.validate.bind(self);

    validationTests.beforeEach(async () => {
      self.where.returns({ fetchAll: self.fetchAll });

      self.attributes = {};
      self.hasChanged.returns(false);
    });

    validationTests.test('valid if nothing has changed', async validTest => {
      validTest.resolves(validate(), 'resolves');
    });

    validationTests.test('if the email is changed...', async email => {
      email.beforeEach(async () => {
        self.attributes.email = 'new@email';
        self.hasChanged.withArgs('email').returns(true);
      });

      email.test(
        'and another user already has that email',
        async invalidTest => {
          self.fetchAll.resolves([{}]);

          invalidTest.rejects(
            validate(),
            { message: 'email-exists' },
            'rejects'
          );
        }
      );

      email.test('and the email is unique', async validTest => {
        self.fetchAll.resolves([]);
        validTest.resolves(validate(), 'resolves');
      });
    });

    validationTests.test('if the password is changed...', async password => {
      password.beforeEach(async () => {
        self.attributes.email = 'email';
        self.attributes.name = 'Bob';
        self.attributes.password = 'password';
        self.hasChanged.withArgs('password').returns(true);
      });

      password.test('and the password is too weak', async invalidTest => {
        passwordChecker.returns({ score: 2 });

        let error;
        try {
          await validate();
        } catch (e) {
          error = e;
        }

        invalidTest.match(
          error,
          { message: 'weak-password' },
          'rejects with a message'
        );
        invalidTest.ok(
          passwordChecker.calledWith('password', ['email', 'Bob']),
          'password checker called with extra data'
        );
      });

      password.test('and the password is strong', async validTest => {
        passwordChecker.returns({ score: 4 });
        bcrypt.hashSync.returns('hashed-password');

        await validate();

        validTest.ok(
          passwordChecker.calledWith('password', ['email', 'Bob']),
          'password checker called with extra data'
        );
        validTest.ok(
          self.set.calledWith({ password: 'hashed-password' }),
          'updates the model with a hashed password'
        );
      });
    });

    validationTests.test('if the phone number is changed...', async phone => {
      phone.beforeEach(async () => {
        self.hasChanged.withArgs('phone').returns(true);
      });

      phone.test(
        'and the phone number has more than 10 digits, after removing non-numeric characters',
        async invalidTest => {
          self.attributes.phone = 'abc123-zyx-456:789(0123)';

          invalidTest.rejects(
            () => validate(),
            { message: 'invalid-phone' },
            'rejects with a message'
          );
        }
      );

      phone.test(
        'and the phone number has 10 or fewer digits, after removing non-numeric characters',
        async validTest => {
          self.attributes.phone = 'abc123-zyx-456:789';
          validTest.resolves(validate(), 'resolves');
        }
      );
    });
  });

  userModelTests.test('activities helper method', async activitesTests => {
    const self = {
      load: sandbox.stub(),
      related: sandbox.stub(),
      relations: { role: false }
    };
    const related = sandbox.stub();
    const pluck = sandbox.stub();
    const activities = user.user.activities.bind(self);

    activitesTests.beforeEach(done => {
      self.load.resolves();
      self.related.withArgs('role').returns({ related });
      self.relations.role = false;
      related.withArgs('activities').returns({ pluck });
      pluck.withArgs('name').returns(['one', 'two', 'three']);

      done();
    });

    activitesTests.test(
      'resolves a list of activites when the role relationship is already loaded',
      async alreadyLoadedTests => {
        self.relations.role = {};
        self.relations.role.activities = true;
        const list = await activities();

        alreadyLoadedTests.ok(
          self.load.notCalled,
          'the model load method is not called'
        );
        alreadyLoadedTests.same(
          list,
          ['one', 'two', 'three'],
          'returns the list of activities'
        );
      }
    );

    activitesTests.test(
      'resolves a list of activites when the role relationship is not already loaded',
      async notAlreadyLoadedTests => {
        self.relations.role = false;
        const list = await activities();

        notAlreadyLoadedTests.ok(
          self.load.calledOnce,
          'the model load method is called'
        );
        notAlreadyLoadedTests.same(
          list,
          ['one', 'two', 'three'],
          'returns the list of activities'
        );
      }
    );
  });

  userModelTests.test('apds helper method', async apdsTests => {
    const self = {
      load: sandbox.stub(),
      related: sandbox.stub(),
      relations: { state: false }
    };
    const related = sandbox.stub();
    const pluck = sandbox.stub();
    const apds = user.user.apds.bind(self);

    apdsTests.beforeEach(done => {
      self.load.resolves();
      self.related.withArgs('state').returns({ related });
      self.relations.role = false;
      related.withArgs('apds').returns({ pluck });
      pluck.withArgs('id').returns([1, 2, 3]);

      done();
    });

    apdsTests.test(
      'resolves a list of apds when the state relationship is already loaded',
      async alreadyLoadedTests => {
        self.relations.state = { relations: { apds: true } };
        const list = await apds();

        alreadyLoadedTests.ok(
          self.load.notCalled,
          'the model load method is not called'
        );
        alreadyLoadedTests.same(list, [1, 2, 3], 'returns the list of apds');
      }
    );

    apdsTests.test(
      'resolves a list of apds when the state relationship is loaded but its APDs are not',
      async test => {
        self.relations.state = { relations: {} };
        const list = await apds();

        test.ok(self.load.calledOnce, 'the model load method is called');
        test.same(list, [1, 2, 3], 'returns the list of apds');
      }
    );

    apdsTests.test(
      'resolves a list of apds when the state relationship is not already loaded',
      async notAlreadyLoadedTests => {
        self.relations.state = false;
        const list = await apds();

        notAlreadyLoadedTests.ok(
          self.load.calledOnce,
          'the model load method is called'
        );
        notAlreadyLoadedTests.same(list, [1, 2, 3], 'returns the list of apds');
      }
    );
  });
});
