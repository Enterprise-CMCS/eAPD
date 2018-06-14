const tap = require('tap');
const sinon = require('sinon');

const { can } = require('../../middleware');
const postEndpoint = require('./post');

tap.test('apds POST endpoint', async endpointTest => {
  const sandbox = sinon.createSandbox();
  const app = { post: sinon.stub() };

  const ApdModel = {
    forge: sandbox.stub(),
    where: sandbox.stub()
  };

  endpointTest.test('setup', async test => {
    postEndpoint(app, ApdModel);

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

    tests.beforeEach(async () => {
      console.log('tests beforeEach');
      sandbox.resetBehavior();
      sandbox.resetHistory();

      res.send.returns(res);
      res.status.returns(res);
      res.end.returns(res);

      ApdModel.forge.returns({
        get: sandbox
          .stub()
          .withArgs('id')
          .returns('new-apd-id'),
        save: sandbox.stub().resolves()
      });
      ApdModel.where.returns({
        fetch: sandbox.stub().resolves('this is the new APD')
      });

      postEndpoint(app, ApdModel);
      handler = app.post.args[0].slice(-1).pop();
    });

    tests.test('sends a 500 code for database errors', async test => {
      ApdModel.forge.throws(new Error('boop'));
      await handler(req, res);

      test.ok(res.status.calledWith(500), 'HTTP status set to 500');
      test.ok(res.end.calledOnce, 'response is terminated');
    });

    tests.test('sends back the new APD if everything works', async test => {
      await handler(req, res);

      test.ok(ApdModel.forge.calledWith({ state_id: 'st', status: 'draft' }));
      test.ok(
        res.send.calledWith('this is the new APD'),
        'sends back the new APD'
      );
    });
  });
});
