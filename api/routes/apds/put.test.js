const tap = require('tap');
const sinon = require('sinon');

const { loggedIn, userCanEditAPD } = require('../../middleware');
const putEndpoint = require('./put');

tap.test('apds PUT endpoint', async endpointTest => {
  const sandbox = sinon.createSandbox();
  const app = { put: sandbox.stub() };
  const res = {
    status: sandbox.stub(),
    send: sandbox.stub(),
    end: sandbox.stub()
  };

  endpointTest.beforeEach(done => {
    sandbox.resetBehavior();
    sandbox.resetHistory();

    res.status.returns(res);
    res.send.returns(res);
    res.end.returns(res);

    done();
  });

  endpointTest.test('setup', async setupTest => {
    putEndpoint(app);

    setupTest.ok(
      app.put.calledWith(
        '/apds/:id',
        loggedIn,
        userCanEditAPD(),
        sinon.match.func
      ),
      'apds PUT endpoint is registered'
    );
  });

  endpointTest.test('edit apds handler', async handlerTest => {
    let handler;
    let req;
    handlerTest.beforeEach(async () => {
      putEndpoint(app);
      handler = app.put.args.find(args => args[0] === '/apds/:id').pop();

      req = {
        user: { id: 1 },
        params: { id: 1 },
        meta: {
          apd: {
            get: sandbox
              .stub()
              .withArgs('id')
              .returns('apd-id-from-db'),
            related: sandbox.stub(),
            set: sandbox.spy(),
            save: sandbox.stub().resolves(),
            toJSON: sandbox.stub().returns('apd-as-json')
          }
        }
      };
    });

    handlerTest.test(
      'sends a server error if anything goes wrong',
      async saveTest => {
        req.meta.apd.save.rejects();

        await handler(req, res);

        saveTest.ok(res.status.calledWith(500), 'HTTP status set to 500');
      }
    );

    handlerTest.test('updates a valid apd object', async validTest => {
      req.body = { status: 'foo', misc: 'baz' };

      await handler(req, res);

      validTest.ok(
        req.meta.apd.set.calledWith({ status: 'foo' }),
        'sets the apd status field'
      );
      validTest.ok(
        req.meta.apd.save.calledAfter(req.meta.apd.set),
        'the model is saved after values are set'
      );
      validTest.ok(res.status.notCalled, 'HTTP status is not explicitly set');
      validTest.ok(
        req.meta.apd.toJSON.calledOnce,
        'database object is converted to pure object'
      );
      validTest.ok(
        res.send.calledWith('apd-as-json'),
        'updated apd data is sent'
      );
    });
  });
});
