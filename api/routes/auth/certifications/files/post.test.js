import tap from 'tap';
import sinon from 'sinon';
import { can } from '../../../../middleware';
import { loggedIn } from '../../../../middleware/auth';
import postEndpoint from './post';
import mockExpress from '../../../../util/mockExpress';
import mockResponse from '../../../../util/mockResponse';

let app;
let res;
let next;

tap.test('state certifications files endpoints', async endpointTest => {
  const di = {
    getFile: sinon.stub(),
    putFile: sinon.stub(),
    crypto: {
      createHash: sinon.stub(),
      update: sinon.stub(),
      digest: sinon.stub()
    },
    validateDoc: sinon.stub()
  };

  endpointTest.beforeEach(() => {
    app = mockExpress();
    res = mockResponse();
    next = sinon.stub();
  });

  endpointTest.test('setup', async setupTest => {
    postEndpoint(app);

    setupTest.ok(
      app.post.calledWith(
        '/auth/certifications/files',
        loggedIn,
        can('edit-state-certifications'),
        sinon.match.func
      ),
      '/auth/certifications/files POST endpoint is setup'
    );
  });

  endpointTest.test(
    'POST endpoint for uploading a state certification letter/file',
    async tests => {
      let handler;
      const data = 'buff';
      const req = {};

      tests.beforeEach(async () => {
        postEndpoint(app, { ...di });
        handler = app.post.args
          .find(args => args[0] === '/auth/certifications/files')
          .pop();
        di.crypto.createHash.withArgs('sha256').returnsThis();
        di.crypto.update.withArgs(data).returnsThis();
        di.crypto.digest.withArgs('hex').returns('123');
      });

      tests.test('the file is not a valid doc type', async test => {
        di.validateDoc.resolves({
          error: 'Unsupported file format'
        });
        req.files = {
          file: {
            data,
            size: 1234
          }
        };

        await handler(req, res, next);

        test.ok(res.status.calledWith(415), 'sends a 415 error');
        test.ok(
          res.json.calledWith({
            error: 'Unsupported file format'
          })
        );
        test.ok(res.json.calledAfter(res.status), 'response is terminated');
      });

      tests.test(
        'with a valid doc the file is saved to storage provider',
        async test => {
          di.validateDoc.returns({});
          req.files = {
            file: {
              data,
              size: 1234
            }
          };
          di.putFile.resolves();

          await handler(req, res, next);

          test.ok(
            res.send.calledWith({
              url: '/auth/certifications/files/123'
            })
          );
        }
      );

      tests.test(
        'error persisting file to local or remote storage',
        async test => {
          di.validateDoc.returns({});
          req.files = {
            file: {
              data,
              size: 1234
            }
          };
          di.putFile.rejects();

          await handler(req, res, next);

          test.ok(
            next.calledWith({ message: 'Unable to upload file' }),
            'sends error message'
          );
        }
      );
    }
  );
});
