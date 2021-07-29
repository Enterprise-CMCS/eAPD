const tap = require('tap');
const sinon = require('sinon');

const { can } = require('../../middleware');
const endpoint = require('./delete');

const mockExpress = require('../../util/mockExpress');
const mockResponse = require('../../util/mockResponse');

let app;
let req;
let res;
let next;
let removeAffiliationsForUser;

tap.test(
  '/cypress/affiliations/:username DELETE endpoint',
  async endpointTest => {
    endpointTest.beforeEach(async () => {
      app = mockExpress();
      res = mockResponse();
      next = sinon.stub();
      removeAffiliationsForUser = sinon.stub();

      req = {
        params: {
          username: 'test'
        },
        user: {
          role: 'eAPD Federal Admin',
          activities: ['edit-affiliations']
        }
      };
    });

    endpointTest.test('setup', async test => {
      endpoint(app);

      test.ok(
        app.delete.calledWith(
          '/cypress/affiliations/:username',
          can('edit-affiliations'),
          sinon.match.func
        ),
        'DELETE endpoint is registered'
      );
    });

    endpointTest.test('handles unexpected errors', async t => {
      endpoint(app, { removeAffiliationsForUser });
      const handler = app.delete.args
        .find(args => args[0] === '/cypress/affiliations/:username')
        .pop();
      const err = { error: 'err0r' };
      removeAffiliationsForUser.rejects(err);

      await handler(req, res, next);

      t.ok(next.called, 'next is called');
      t.ok(next.calledWith(err), 'pass error to middleware');
    });

    endpointTest.test(
      'does not allow non-Fed Admin users to delete',
      async test => {
        req.user.role = 'eAPD User';

        endpoint(app, { removeAffiliationsForUser });
        const handler = app.delete.args
          .find(args => args[0] === '/cypress/affiliations/:username')
          .pop();

        await handler(req, res, next);

        test.ok(
          removeAffiliationsForUser.notCalled,
          'removeAffiliationsForUser is not called'
        );
        test.ok(res.status.calledWith(403), 'HTTP status set to 403');
        test.ok(res.send.notCalled, 'no body is sent');
        test.ok(res.end.called, 'response is terminated');
      }
    );

    endpointTest.test('allows Fed Admin users to delete', async test => {
      endpoint(app, { removeAffiliationsForUser });
      const handler = app.delete.args
        .find(args => args[0] === '/cypress/affiliations/:username')
        .pop();

      removeAffiliationsForUser.resolves();

      await handler(req, res, next);

      test.ok(
        removeAffiliationsForUser.calledWith({ username: 'test' }),
        'removeAffiliationsForUser is called'
      );
      test.ok(res.status.calledWith(204), 'HTTP status set to 204');
      test.ok(res.send.notCalled, 'no body is sent');
      test.ok(res.end.called, 'response is terminated');
    });
  }
);
