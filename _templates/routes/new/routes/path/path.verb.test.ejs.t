---
to: api/routes/<%= httpPath %>/<%= httpVerb %>.test.js
---
const tap = require('tap');
const sinon = require('sinon');
const <%=httpVerb %>Endpoint = require('./<%=httpVerb %>');

const mockExpress = require('../../util/mockExpress');
const mockResponse = require('../../util/mockResponse');

let app;
let res;
let next;


tap.test('<%= httpPath %> <%=httpVerb.toUpperCase() %> endpoint', async endpointTest => {
  endpointTest.beforeEach(async () => {
    app = mockExpress();
    res = mockResponse();
    next = sinon.stub();
  });

  endpointTest.test('setup', async setupTest => {
    getEndpoint(app);

    setupTest.ok(
      app.<%= httpVerb %>.calledWith('/<%= httpPath %>', sinon.match.func),
      '<%= httpPath %> <%= httpVerb.toUpperCase() %> endpoint is registered'
    );
  });

  endpointTest.test('<%=httpVerb %> <%=httpPath %> handler', async tests => {
    let handler;

    tests.beforeEach(async () => {
      <%= httpVerb %>Endpoint(app, { });
      handler = app.<%= httpVerb %>.args.find(
        args => args[0] === '/<%= httpPath %>'
      ).pop();
    });

    tests.test('basic handler test', async test => {
        const req = {}
        await handler(req, res, next);
        test.ok(res.send.calledWith({result: 'success'}))
    })

  });



});
