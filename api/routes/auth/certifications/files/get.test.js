import tap from 'tap';
import sinon from 'sinon';
import { can } from '../../../../middleware';
import { loggedIn } from '../../../../middleware/auth';
import getEndpoint from './get';
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
    validateDoc: sinon.stub(),
    generateFileName: sinon.stub()
  };

  endpointTest.beforeEach(() => {
    app = mockExpress();
    res = mockResponse();
    next = sinon.stub();
  });

  endpointTest.test('setup', async setupTest => {
    getEndpoint(app);

    setupTest.ok(
      app.get.calledWith(
        '/auth/certifications/files/:fileID',
        loggedIn,
        can('view-state-certifications'),
        sinon.match.func
      ),
      '/auth/certifications/files/:fileId GET endpoint is setup'
    );
  });

  endpointTest.test(
    'GET endpoint for fetching a state certification letter/file',
    async tests => {
      let handler;

      tests.beforeEach(async () => {
        getEndpoint(app, { ...di });
        handler = app.get.args
          .find(args => args[0] === '/auth/certifications/files/:fileID')
          .pop();
      });

      tests.test('there is an error retrieving the file', async test => {
        const error = new Error('some error');

        di.getFile.rejects(error);

        await handler({ params: { fileID: 'file id' } }, res, next);

        test.ok(next.calledWith(error));
      });

      tests.test('file is returned successfully', async test => {
        const file = {};
        di.getFile.resolves(file);
        di.generateFileName.resolves('Sample-File-Name.pdf');

        await handler({ params: { fileID: 'file id' } }, res, next);

        test.ok(res.send.calledWith(file), 'sends the file');
        test.ok(res.end.calledAfter(res.send), 'response is terminated');
      });
    }
  );
});
