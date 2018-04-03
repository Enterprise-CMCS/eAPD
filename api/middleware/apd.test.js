const tap = require('tap');
const sandbox = require('sinon').createSandbox();

const middleware = require('./apd');

const OtherModel = {
  where: sandbox.stub(),
  fetch: sandbox.stub(),
  withRelated: {},
  modelName: ''
};

const res = {
  status: sandbox.stub(),
  send: sandbox.stub(),
  end: sandbox.stub()
};
const next = sandbox.spy();

tap.test('APD-related middleware', async middlewareTests => {
  middlewareTests.beforeEach(done => {
    sandbox.resetBehavior();
    sandbox.resetHistory();

    OtherModel.modelName = '';

    res.status.returns(res);
    res.send.returns(res);
    res.end.returns(res);

    done();
  });

  middlewareTests.test('load apd', async loadApdTests => {
    loadApdTests.test('from an APD model', async apdModelTest => {
      apdModelTest.beforeEach(async () => {
        OtherModel.modelName = 'apd';
        OtherModel.where.withArgs({ id: 9 }).returns(OtherModel);
      });

      apdModelTest.test(
        'when there is an error loading the APD',
        async invalidTest => {
          OtherModel.fetch.rejects();

          const req = { meta: {}, params: { 'apd-id': 9 } };
          await middleware.loadApd(OtherModel, 'apd-id')(req, res, next);

          invalidTest.ok(
            res.status.calledWith(500),
            'HTTP status is set to 500'
          );
          invalidTest.ok(res.end.calledOnce, 'response is closed');
          invalidTest.ok(next.notCalled, 'next is not called');
        }
      );

      apdModelTest.test(
        'when there is no associated APD',
        async invalidTest => {
          OtherModel.fetch.resolves(false);

          const req = { meta: {}, params: { 'apd-id': 9 } };
          await middleware.loadApd(OtherModel, 'apd-id')(req, res, next);

          invalidTest.ok(
            res.status.calledWith(404),
            'HTTP status is set to 404'
          );
          invalidTest.ok(res.end.calledOnce, 'response is closed');
          invalidTest.ok(next.notCalled, 'next is not called');
        }
      );

      apdModelTest.test('when there is an associated APD', async validTest => {
        const apd = { hello: 'world' };
        OtherModel.fetch.resolves(apd);

        const req = { meta: {}, params: { 'apd-id': 9 } };
        await middleware.loadApd(OtherModel, 'apd-id')(req, res, next);

        validTest.ok(res.status.notCalled, 'HTTP status is not set');
        validTest.ok(res.end.notCalled, 'response is not closed');
        validTest.ok(next.calledOnce, 'next is called');
        validTest.equal(
          req.meta.apd,
          apd,
          'sets the APD on the request object'
        );
      });
    });

    loadApdTests.test('from a non-APD model', async apdModelTest => {
      apdModelTest.test(
        'when there is an error loading the non-APD object',
        async invalidTest => {
          OtherModel.where.withArgs({ id: 9 }).returns(OtherModel);
          OtherModel.fetch.rejects();

          const req = { meta: {}, params: { 'obj-id': 9 } };
          await middleware.loadApd(OtherModel, 'obj-id')(req, res, next);

          invalidTest.ok(
            res.status.calledWith(500),
            'HTTP status is set to 500'
          );
          invalidTest.ok(res.end.calledOnce, 'response is closed');
          invalidTest.ok(next.notCalled, 'next is not called');
        }
      );

      apdModelTest.test(
        'when the non-APD object does not exist',
        async invalidTest => {
          OtherModel.where.withArgs({ id: 9 }).returns(OtherModel);
          OtherModel.fetch.resolves(false);

          const req = { meta: {}, params: { 'obj-id': 9 } };
          await middleware.loadApd(OtherModel, 'obj-id')(req, res, next);

          invalidTest.ok(
            res.status.calledWith(404),
            'HTTP status is set to 404'
          );
          invalidTest.ok(res.end.calledOnce, 'response is closed');
          invalidTest.ok(next.notCalled, 'next is not called');
        }
      );

      apdModelTest.test(
        'when the non-APD object does not have an APD',
        async invalidTest => {
          OtherModel.where.withArgs({ id: 9 }).returns(OtherModel);
          OtherModel.fetch.resolves({
            related: sandbox
              .stub()
              .withArgs('apd')
              .returns(false)
          });

          const req = { meta: {}, params: { 'obj-id': 9 } };
          await middleware.loadApd(OtherModel, 'obj-id')(req, res, next);

          invalidTest.ok(
            res.status.calledWith(404),
            'HTTP status is set to 404'
          );
          invalidTest.ok(res.end.calledOnce, 'response is closed');
          invalidTest.ok(next.notCalled, 'next is not called');
        }
      );

      apdModelTest.test(
        'when there is an associated object with an APD',
        async validTest => {
          const apd = { hello: 'world' };
          OtherModel.where.withArgs({ id: 9 }).returns(OtherModel);
          OtherModel.fetch.resolves({
            related: sandbox
              .stub()
              .withArgs('apd')
              .returns(apd)
          });

          const req = { meta: {}, params: { 'apd-id': 9 } };
          await middleware.loadApd(OtherModel, 'apd-id')(req, res, next);

          validTest.ok(res.status.notCalled, 'HTTP status is not set');
          validTest.ok(res.end.notCalled, 'response is not closed');
          validTest.ok(next.calledOnce, 'next is called');
          validTest.equal(
            req.meta.apd,
            apd,
            'sets the APD on the request object'
          );
        }
      );
    });
  });

  middlewareTests.test('user can edit apd', async editApdTests => {
    editApdTests.beforeEach(async () => {
      OtherModel.where.returns(OtherModel);
      OtherModel.fetch.resolves({
        related: sandbox.stub().returns({
          get: sandbox
            .stub()
            .withArgs('id')
            .returns('florp')
        })
      });
    });

    editApdTests.test(
      'sends a 404 if the user does not have access to the APD',
      async invalidTest => {
        const req = {
          user: { model: { apds: sandbox.stub().resolves([1, 2, 3]) } },
          meta: {},
          params: { 'apd-id': 'florp' }
        };
        await middleware.userCanEditAPD(OtherModel, 'apd-id')(req, res, next);

        invalidTest.ok(res.status.calledWith(404), 'HTTP status is set to 404');
        invalidTest.ok(res.end.calledOnce, 'response is closed');
        invalidTest.ok(next.notCalled, 'next is not called');
      }
    );

    editApdTests.test(
      'passes if the user has access to the APD',
      async validTest => {
        const req = {
          user: { model: { apds: sandbox.stub().resolves(['florp', 2, 3]) } },
          meta: {},
          params: { 'apd-id': 'florp' }
        };
        await middleware.userCanEditAPD(OtherModel, 'apd-id')(req, res, next);

        validTest.ok(res.status.notCalled, 'HTTP status is not set');
        validTest.ok(res.end.notCalled, 'response is not closed');
        validTest.ok(next.calledOnce, 'next is called');
      }
    );
  });

  middlewareTests.test('load activity', async loadActivityTests => {
    loadActivityTests.test(
      'when there is an error loading the activity',
      async invalidTest => {
        OtherModel.where.withArgs({ id: 7 }).returns(OtherModel);
        OtherModel.fetch.rejects();
        const req = { meta: {}, params: { 'activity-id': 7 } };

        await middleware.loadActivity(OtherModel, 'activity-id')(
          req,
          res,
          next
        );

        invalidTest.ok(res.status.calledWith(500), 'HTTP status is set to 500');
        invalidTest.ok(res.end.calledOnce, 'response is not closed');
        invalidTest.ok(next.notCalled, 'next is called');
      }
    );

    loadActivityTests.test(
      'when the activity does not exist',
      async invalidTest => {
        OtherModel.where.withArgs({ id: 7 }).returns(OtherModel);
        OtherModel.fetch.resolves(false);
        const req = { meta: {}, params: { 'activity-id': 7 } };

        await middleware.loadActivity('activity-id', OtherModel)(
          req,
          res,
          next
        );

        invalidTest.ok(res.status.calledWith(404), 'HTTP status is set to 404');
        invalidTest.ok(res.end.calledOnce, 'response is not closed');
        invalidTest.ok(next.notCalled, 'next is called');
      }
    );

    loadActivityTests.test('when the activity does exist', async validTest => {
      const activity = { hello: 'world' };
      OtherModel.where.withArgs({ id: 7 }).returns(OtherModel);
      OtherModel.fetch.resolves(activity);
      OtherModel.withRelated = 'chickens are related to dinosaurs';
      const req = { meta: {}, params: { 'activity-id': 7 } };

      await middleware.loadActivity('activity-id', OtherModel)(req, res, next);

      validTest.ok(res.status.notCalled, 'HTTP status is not set');
      validTest.ok(res.end.notCalled, 'response is not closed');
      validTest.ok(next.calledOnce, 'next is called');
      validTest.equal(
        req.meta.activity,
        activity,
        'sets the activity on the request'
      );
    });
  });
});
