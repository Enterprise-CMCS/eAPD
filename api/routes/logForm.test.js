const tap = require('tap');
const sinon = require('sinon');

const formLoggerEndpoint = require('./logForm');

tap.test('form logger endpoint', async endpointTest => {
  const sandbox = sinon.createSandbox();
  const app = {
    get: sandbox.stub(),
    post: sandbox.stub()
  };
  const res = {
    status: sandbox.stub(),
    send: sandbox.stub(),
    end: sandbox.stub()
  };

  let get;
  let post;

  endpointTest.beforeEach(done => {
    sandbox.reset();

    res.status.returns(res);
    res.send.returns(res);
    res.end.returns(res);

    done();
  });

  endpointTest.test('setup', async setupTest => {
    formLoggerEndpoint(app);

    setupTest.ok(
      app.get.calledWith('/log-form', sinon.match.func),
      'form logs GET endpoint is registered'
    );
    setupTest.ok(
      app.post.calledWith('/log-form', sinon.match.func),
      'form logs POST endpoint is registered'
    );

    get = app.get.args[0][1];
    post = app.post.args[0][1];
  });

  endpointTest.test('logger POST endpoint', async postTest => {
    post(
      {
        body: {
          user: 'theUser',
          form: {
            field1: 'value1',
            field2: 'value2',
            field3: ['value3a', 'value3b', 'value3c']
          }
        }
      },
      res
    );

    postTest.ok(res.status.calledWith(200), 'sends a 200 HTTP status');
    postTest.ok(res.end.calledOnce, 'response is ended');
  });

  endpointTest.test('logger GET endpont', async getTest => {
    get(null, res);

    getTest.ok(res.send.calledOnce, 'a response body is sent');
    getTest.same(
      res.send.args[0][0],
      {
        theUser: {
          field1: 'value1',
          field2: 'value2',
          field3: ['value3a', 'value3b', 'value3c']
        }
      },
      'sends back the expected form content'
    );
  });
});
