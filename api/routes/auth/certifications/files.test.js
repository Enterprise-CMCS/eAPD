const tap = require('tap');
const sinon = require('sinon');
const multer = require('multer');

const can = require('../../../middleware').can;

const { loggedIn } = require('../../../middleware/auth');

const filesEndpoint = require('./files');

const mockExpress = require('../../../util/mockExpress');
const mockResponse = require('../../../util/mockResponse');

let app;
let res;
let next;

tap.test('POST /auth/certifications/files', async endpointTest => {
  const sandbox = sinon.createSandbox();
  const app = { get: sandbox.stub(), post: sandbox.stub() };
  
  const di = {
    validateDoc: sandbox.stub(),
    getFile: sandbox.stub(),
    putFile: sandbox.stub()
  };
  
  const res = {
    status: sandbox.stub(),
    send: sandbox.stub(),
    end: sandbox.stub()
  };
  
  const next = sandbox.stub();
  
  endpointTest.beforeEach(() => {
    sandbox.resetBehavior();
    sandbox.resetHistory();
  
    res.status.returns(res);
    res.send.returns(res);
    res.end.returns(res);
  });

  endpointTest.test('setup', async setupTest => {
    filesEndpoint(app);
    
    setupTest.ok(
      app.post.calledWith(
        '/auth/certifications/files', 
        loggedIn,
        can('edit-state-certifications'), 
        sinon.match.func // Question: what is this?
      ),
      '/auth/certifications/files POST endpoint is setup'
    );
  });
  
  endpointTest.test('POST endpoint for uploading an state certification letter/file', async tests => {
    let handler;
  
    const req = {};
    
    tests.beforeEach(async () => {
      filesEndpoint(app, { ...di });
      handler = app.post.args[0].pop(); // Figure out why we are using this handler and removing the first arg. Perhaps to manually mock the file?
    });
  
    tests.test('the file is an image', async test => {
      di.validateDoc.resolves({
        error: 'Unsupported file format'
      });
      req.file = {
        buffer: 'this needs to be binary data?',
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
    
    
  });
    
});