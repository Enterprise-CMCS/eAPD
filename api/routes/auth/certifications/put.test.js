import tap from 'tap';
import { stub, match } from 'sinon';
import { can, loggedIn } from '../../../middleware/index.js';
import putEndpoint from './put.js';
import mockExpress from '../../../util/mockExpress.js';
import mockResponse from '../../../util/mockResponse.js';

let app;
let res;
let next;

tap.test('state certifications post endpoint', async putTest => {
  const di = {
    matchStateAdminCertification: stub(),
    updateAuthAffiliation: stub(),
    getAllActiveRoles: stub()
  };

  putTest.beforeEach(() => {
    app = mockExpress();
    res = mockResponse();
    next = stub();
  });

  putTest.test('setup', async setupTest => {
    putEndpoint(app);

    setupTest.ok(
      app.put.calledWith(
        '/auth/certifications',
        loggedIn,
        can('edit-state-certifications'),
        match.func
      ),
      '/auth/certifications PUT endpoint is setup'
    );
  });

  putTest.test(
    'PUT endpoint for matching state admin certification letters',
    async tests => {
      let handler;

      tests.beforeEach(async () => {
        di.getAllActiveRoles.resolves([
          { name: 'eAPD State Admin', id: '123' }
        ]);
        putEndpoint(app, { ...di });
        handler = app.put.args
          .find(args => args[0] === '/auth/certifications')
          .pop();
      });

      tests.test('the db fails to save', async test => {
        const err = { error: 'cant save' };
        di.matchStateAdminCertification.throws(err);

        await handler(
          {
            user: {
              id: '123'
            },
            body: {
              certificationId: '123',
              certificationFfy: '2022',
              affiliationId: '213',
              stateId: 'ak'
            }
          },
          res,
          next
        );

        test.ok(res.send.notCalled, 'no body is sent');
        test.ok(next.called, 'next is called');
      });

      tests.test('with valid response', async test => {
        di.updateAuthAffiliation.resolves();
        di.matchStateAdminCertification.resolves({ error: null });

        await handler(
          {
            user: {
              id: '123'
            },
            body: {
              certificationId: '123',
              certificationFfy: '2022',
              affiliationId: '213',
              stateId: 'ak'
            }
          },
          res,
          next
        );

        test.ok(res.status.calledWith(200), 'sends a 200 success response');
      });
    }
  );
});
