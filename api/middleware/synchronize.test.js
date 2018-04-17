const tap = require('tap');
const sinon = require('sinon');

const middleware = require('./synchronize');

tap.test('Data model synchronization middleware', async middlewareTests => {
  const sandbox = sinon.createSandbox();
  const next = sandbox.stub();

  const res = {
    end: sandbox.stub(),
    send: sandbox.stub(),
    status: sandbox.stub()
  };

  const getDetails = sandbox.stub();

  middlewareTests.beforeEach(async () => {
    sandbox.resetBehavior();
    sandbox.resetHistory();

    res.send.returns(res);
    res.status.returns(res);
  });

  middlewareTests.test(
    'has a method to synchronize all instances of a model',
    async syncAllTests => {
      const modelClass = {
        fetchAll: sandbox.stub(),
        synchronize: sandbox.stub(),
        where: sandbox.stub()
      };
      syncAllTests.beforeEach(async () => {
        modelClass.where.returns(modelClass);
      });

      syncAllTests.test(
        'sends an HTTP server error if something goes wrong',
        async test => {
          getDetails.throws();
          await middleware.synchronizeAll(getDetails)({}, res, next);

          test.ok(next.notCalled, 'the middleware chain is broken');
          test.ok(res.status.calledWith(500), 'HTTP status is set to 500');
          test.ok(res.send.notCalled, 'no response body is sent');
          test.ok(res.end.calledOnce, 'response is terminated');
        }
      );

      syncAllTests.test(
        'sends an HTTP request error if validation fails',
        async test => {
          getDetails.returns({
            modelClass,
            foreignKey: { id: 'test-id' },
            action: 'test-action'
          });

          const err = new Error();
          err.statusCode = 999;
          err.error = { error: 'it went wrong' };
          modelClass.synchronize.throws(err);

          const body = {};

          await middleware.synchronizeAll(getDetails)({ body }, res, next);

          test.ok(
            modelClass.synchronize.calledWith(body, { id: 'test-id' }, false),
            'models are synchronized according to foreign key; existing models are not deleted'
          );
          test.ok(next.notCalled, 'the middleware chain is broken');
          test.ok(
            res.status.calledWith(999),
            'HTTP status is set according to the error'
          );
          test.ok(
            res.send.calledWith({
              action: 'test-action',
              error: 'it went wrong'
            }),
            'response body is an error token'
          );
          test.ok(res.end.calledOnce, 'response is terminated');
        }
      );

      syncAllTests.test(
        'synchronizes the models and sends back the updated objects',
        async test => {
          getDetails.returns({
            modelClass,
            foreignKey: { id: 'test-id' },
            action: 'test-action'
          });
          modelClass.withRelated = 'a list of relationships';
          modelClass.synchronize.resolves();
          modelClass.fetchAll.resolves({
            toJSON: sandbox.stub().returns('jsonified model')
          });

          const body = {};

          await middleware.synchronizeAll(getDetails)({ body }, res, next);

          test.ok(
            modelClass.synchronize.calledWith(body, { id: 'test-id' }, false),
            'models are synchronized according to foreign key; existing models are not deleted'
          );
          test.ok(
            modelClass.where.calledWith({ id: 'test-id' }),
            'query for updated models is restricted according to foreign key'
          );
          test.ok(
            modelClass.fetchAll.calledWith({
              withRelated: 'a list of relationships'
            }),
            'fetched models include relations'
          );
          test.ok(next.calledOnce, 'the middleware chain is not broken');
          test.ok(res.status.notCalled, 'HTTP status is not explicitly set');
          test.ok(
            res.send.calledWith('jsonified model'),
            'response body is the JSON-ified models'
          );
        }
      );
    }
  );

  middlewareTests.test(
    'has a method to synchronize a specific model instance',
    async syncSpecificTests => {
      const model = {
        fetch: sandbox.stub(),
        synchronize: sandbox.stub()
      };

      syncSpecificTests.test(
        'sends an HTTP server error if something goes wrong',
        async test => {
          getDetails.throws();
          await middleware.synchronizeSpecific(getDetails)({}, res, next);

          test.ok(next.notCalled, 'the middleware chain is broken');
          test.ok(res.status.calledWith(500), 'HTTP status is set to 500');
          test.ok(res.send.notCalled, 'no response body is sent');
          test.ok(res.end.calledOnce, 'response is terminated');
        }
      );

      syncSpecificTests.test(
        'sends an HTTP request error if validation fails',
        async test => {
          getDetails.returns({
            model,
            action: 'test-action'
          });

          const err = new Error();
          err.statusCode = 999;
          err.error = { error: 'it went wrong' };
          model.synchronize.throws(err);

          const body = {};

          await middleware.synchronizeSpecific(getDetails)({ body }, res, next);

          test.ok(model.synchronize.calledWith(body), 'model is synchronized');
          test.ok(next.notCalled, 'the middleware chain is broken');
          test.ok(
            res.status.calledWith(999),
            'HTTP status is set according to the error'
          );
          test.ok(
            res.send.calledWith({
              action: 'test-action',
              error: 'it went wrong'
            }),
            'response body is an error token'
          );
          test.ok(res.end.calledOnce, 'response is terminated');
        }
      );

      syncSpecificTests.test(
        'synchronizes the model and sends back the updated objects',
        async test => {
          getDetails.returns({
            model,
            action: 'test-action'
          });
          model.static = { withRelated: 'list of relationships' };
          model.synchronize.resolves();
          model.fetch.resolves({
            toJSON: sinon.stub().returns('jsonified model')
          });

          const body = {};

          await middleware.synchronizeSpecific(getDetails)({ body }, res, next);

          test.ok(model.synchronize.calledWith(body), 'model is synchronized');
          test.ok(
            model.fetch.calledWith({ withRelated: 'list of relationships' }),
            'model is fetched with relations'
          );
          test.ok(next.calledOnce, 'the middleware chain is not broken');
          test.ok(res.status.notCalled, 'HTTP status is not explicitly set');
          test.ok(
            res.send.calledWith('jsonified model'),
            'response body the JSON-ified model'
          );
        }
      );
    }
  );
});
