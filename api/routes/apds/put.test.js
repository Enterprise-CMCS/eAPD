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
        params: { id: 1 },
        meta: {
          apd: {
            synchronize: sandbox.stub(),
            fetch: sandbox.stub(),
            static: { withRelated: ['aunt', 'brother', 'cousin'] }
          }
        }
      };
    });

    handlerTest.test(
      'sends a server error if anything goes wrong',
      async saveTest => {
        req.meta.apd.synchronize.rejects();

        await handler(req, res);

        saveTest.ok(res.status.calledWith(500), 'HTTP status set to 500');
      }
    );

    handlerTest.test(
      'sends a request error if the new body is invalid',
      async test => {
        const error = new Error('error-message');
        error.statusCode = 400;
        req.meta.apd.synchronize.rejects(error);
        await handler(req, res);

        test.ok(res.status.calledWith(400));
      }
    );

    handlerTest.test(
      'synchronizes the APD with the request body',
      async validTest => {
        const updatedApd = {
          toJSON: sandbox.stub().returns('apd-as-json')
        };

        req.body = { hello: 'world' };
        req.meta.apd.synchronize.resolves();
        req.meta.apd.fetch.resolves(updatedApd);

        await handler(req, res);

        validTest.ok(
          req.meta.apd.synchronize.calledWith({ hello: 'world' }),
          'APD is synchronized with the request body'
        );
        validTest.ok(
          req.meta.apd.fetch.calledWith({
            withRelated: ['aunt', 'brother', 'cousin']
          }),
          'fetches updated APD with related fields'
        );
        validTest.ok(res.status.notCalled, 'HTTP status is not explicitly set');
        validTest.ok(
          res.send.calledWith('apd-as-json'),
          'updated apd data is sent'
        );
      }
    );
  });
});
