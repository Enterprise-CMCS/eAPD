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

tap.test('POST /certifications/files', async endpointTest => {
  endpointTest.beforeEach(() => {
    app = mockExpress();
    res = mockResponse();
    next = sinon.stub();
  });

  endpointTest.test('setup', async setupTest => {
    filesEndpoint(app);

    setupTest.ok(
      app.post.calledWith(
        '/certifications/files', 
        loggedIn,
        can('edit-state-certifications'), 
        sinon.match.func
      ),
      'certifications POST endpoint is setup'
    );
  });
  
  
  
  
});