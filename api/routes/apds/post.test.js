const tap = require('tap');
const sinon = require('sinon');

const { can } = require('../../middleware');
const postEndpoint = require('./post');

tap.test('apds POST endpoint', async endpointTest => {
  const sandbox = sinon.createSandbox();
  const app = { post: sinon.stub() };

  endpointTest.test('setup', async test => {
    postEndpoint(app);

    test.ok(
      app.post.calledWith('/apds', can('edit-document'), sinon.match.func),
      'apds POST endpoint is registered'
    );
  });

  endpointTest.test('handler tests', async tests => {
    let handler;

    const req = { user: { state: 'st' } };

    const res = {
      send: sandbox.stub(),
      status: sandbox.stub(),
      end: sandbox.stub()
    };

    const ApdModel = {
      fetch: sandbox.stub(),
      forge: sandbox.stub(),
      where: sandbox.stub(),
      withRelated: 'relations!'
    };
    const apd = {
      get: sandbox.stub(),
      save: sandbox.stub(),
      synchronize: sandbox.stub()
    };

    const dataBuilder = sandbox.stub();

    tests.beforeEach(async () => {
      sandbox.resetBehavior();
      sandbox.resetHistory();

      res.send.returns(res);
      res.status.returns(res);
      res.end.returns(res);

      ApdModel.forge.returns(apd);

      ApdModel.where.returns({
        fetch: sandbox
          .stub()
          .withArgs({ withRelated: 'related!' })
          .resolves('this is the new APD')
      });

      apd.get.withArgs('id').returns('new apd id');
      apd.save.resolves();
      apd.synchronize.resolves();

      postEndpoint(app, { ApdModel, getNewApd: dataBuilder });
      handler = app.post.args
        .slice(-1)[0]
        .slice(-1)
        .pop();
    });

    tests.test('sends a 500 code for database errors', async test => {
      ApdModel.forge.throws(new Error('boop'));
      await handler(req, res);

      test.ok(res.status.calledWith(500), 'HTTP status set to 500');
      test.ok(res.end.calledOnce, 'response is terminated');
    });

    tests.test('sends back the new APD if everything works', async test => {
      const data = { this: 'is', some: 'apd', data: 'here' };
      dataBuilder.resolves(data);

      await handler(req, res);

      test.ok(
        ApdModel.forge.calledWith({
          state_id: 'st',
          status: 'draft'
        }),
        'new APD is created'
      );

      test.ok(apd.save.calledOnce, 'new APD is saved');
      test.ok(
        apd.save.calledBefore(dataBuilder),
        'APD is created and saved before data is built'
      );
      test.ok(
        dataBuilder.calledBefore(apd.synchronize),
        'APD is synchronized after data is built'
      );
      test.ok(
        apd.synchronize.calledWith(data),
        'APD is synchronized with initial data'
      );

      test.ok(
        apd.synchronize.calledBefore(ApdModel.where),
        'updated APD is fetched after synchronization'
      );
      test.ok(
        ApdModel.where.calledWith({ id: 'new apd id' }),
        'only the newly-created APD is fetched'
      );

      test.ok(
        ApdModel.where.calledBefore(ApdModel.fetch),
        'model query filter is set before fetching'
      );

      test.ok(
        res.send.calledWith('this is the new APD'),
        'sends back the new APD'
      );
    });
  });
});
