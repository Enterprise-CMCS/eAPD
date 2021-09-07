const tap = require('tap');
const sinon = require('sinon');

const { can } = require('../../../middleware');
const { loggedIn } = require('../../../middleware/auth');

const filesEndpoint = require('./files');

const mockExpress = require('../../../util/mockExpress');
const mockResponse = require('../../../util/mockResponse');

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
      digest: sinon.stub(),      
    },
    validateDoc: sinon.stub()
  }
  
  endpointTest.beforeEach(() => {
    app = mockExpress();
    res = mockResponse();
    next = sinon.stub();
  });

  endpointTest.test('setup', async setupTest => {
    filesEndpoint(app);
    
    setupTest.ok(
      app.post.calledWith(
        '/auth/certifications/files', 
        loggedIn,
        can('edit-state-certifications'), 
        sinon.match.func,
        sinon.match.func
      ),
      '/auth/certifications/files POST endpoint is setup'
    );

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
  
  endpointTest.test('POST endpoint for uploading a state certification letter/file', async tests => {
    let handler; 
    const buffer = 'buff';    
    const req = {};
    
    tests.beforeEach(async () => {
      filesEndpoint(app, { ...di });
      handler = app.post.args.find(
        args => args[0] === '/auth/certifications/files'
      ).pop();
      di.crypto.createHash.withArgs('sha256').returnsThis();
      di.crypto.update.withArgs(buffer).returnsThis();
      di.crypto.digest.withArgs('hex').returns('123');
    });
  
    tests.test('the file is not a valid doc type', async test => {
      di.validateDoc.resolves({
        error: 'Unsupported file format'
      })      
      req.file = {
        buffer,
        size: 1234
      };      
      
      await handler(req, res, next); 
  
      test.ok(res.status.calledWith(415), 'sends a 415 error');
      test.ok(
        res.send.calledWith({
          error: 'Unsupported file format'
        })
      );
      test.ok(res.send.calledAfter(res.status), 'response is terminated');
    });
    
    tests.test('with a valid doc the file is saved to storage provider', async test => {
      di.validateDoc.returns({});     
      req.file = {
        buffer,
        size: 1234
      };
      di.putFile.resolves();
      
      await handler(req, res, next);
      
      test.ok(
        res.send.calledWith({
          url: '/auth/certifications/files/123'
        })
      );
    });  
    
    tests.test('error persisting file to local or remote storage', async test => {
      di.validateDoc.returns({});     
      req.file = {
        buffer,
        size: 1234
      };
      di.putFile.rejects();
      
      await handler(req, res, next);

      test.ok(
        next.calledWith({ message: 'Unable to upload file' }),
        'sends error message'
      );
    });      
  });    
  
  endpointTest.test('GET endpoint for fetching a state certification letter/file', async tests => {
    let handler; 
    
    tests.beforeEach(async () => {
      filesEndpoint(app, { ...di });
      handler = app.get.args.find(
        args => args[0] === '/auth/certifications/files/:fileID'
      ).pop();
    });

    tests.test('there is an error retrieving the file', async test => {
      const error = new Error('some error');
      
      di.getFile.rejects(error);
      
      await handler(
        { params: { fileID: 'file id' } },
        res,
        next
      );

      test.ok(next.calledWith(error));
    });
    
    tests.test('file is returned successfully', async test => {
      const file = {};
      di.getFile.resolves(file);
      
      await handler(
        { params: { fileID: 'file id' } },
        res,
        next
      );

      test.ok(res.send.calledWith(file), 'sends the file');
      test.ok(res.end.calledAfter(res.send), 'response is terminated');
    });    
  });
});