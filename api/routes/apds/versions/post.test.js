const tap = require('tap');
const sinon = require('sinon');

const { can, loadApd, userCanEditAPD } = require('../../../middleware');
const endpoint = require('./post');

tap.test('apds version POST endpoint', async tests => {
  const sandbox = sinon.createSandbox();

  const app = {
    post: sandbox.stub()
  };

  const ApdModel = {
    fetch: sandbox.stub(),
    where: sandbox.stub(),
    withRelated: 'with related'
  };

  const VersionModel = {
    forge: sandbox.stub()
  };

  tests.beforeEach(async () => {
    sandbox.resetBehavior();
    sandbox.resetHistory();

    ApdModel.where.returns(ApdModel);
  });

  tests.test('setup', async test => {
    endpoint(app, { ApdModel, VersionModel });

    test.ok(
      app.post.calledWith(
        '/apds/:id/versions',
        can('submit-document'),
        userCanEditAPD(),
        loadApd(),
        sinon.match.func
      ),
      'user-specific apds GET endpoint is registered'
    );
  });

  tests.test('saves a version', async test => {
    endpoint(app, { ApdModel, VersionModel });
    const handler = app.post.args[0].slice(-1)[0];

    const tables = {
      this: 'is',
      a: 'table'
    };
    const req = {
      body: { tables },
      meta: {
        apd: {
          get: sandbox
            .stub()
            .withArgs('id')
            .returns('meta apd id')
        }
      },
      user: {
        id: 'user id'
      }
    };

    const res = {
      end: sandbox.stub(),
      send: sandbox.stub(),
      status: sandbox.stub()
    };
    res.end.returns(res);
    res.send.returns(res);
    res.status.returns(res);

    const apd = {
      get: sandbox
        .stub()
        .withArgs('id')
        .returns('db apd id'),
      toJSON: sandbox.stub().returns({ apd: 'as JSON' }),
      save: sandbox.stub().resolves(),
      set: sandbox.stub()
    };
    ApdModel.fetch.resolves(apd);

    const version = {
      save: sandbox.stub().resolves()
    };
    VersionModel.forge.returns(version);

    await handler(req, res);

    test.ok(
      ApdModel.where.calledWith({ id: 'meta apd id' }),
      'queries the database for the full APD'
    );
    test.ok(
      ApdModel.fetch.calledWith({ withRelated: 'with related' }),
      'fetches APD related data'
    );
    test.ok(
      VersionModel.forge.calledWith({
        apd_id: 'db apd id',
        user_id: 'user id',
        content: {
          this: 'is',
          a: 'table',
          apd: 'as JSON'
        }
      }),
      'creates a version'
    );
    test.ok(
      apd.set.calledWith({ status: 'submitted' }),
      'sets APD status to "submitted"'
    );
    test.ok(apd.save.calledAfter(apd.set), 'APD is saved after status is set');
    test.ok(version.save.calledOnce, 'version is saved');
    test.ok(res.status.calledWith(204), 'HTTP status 204 is set');
    test.ok(res.end.calledOnce, 'response is terminated');
  });
});
