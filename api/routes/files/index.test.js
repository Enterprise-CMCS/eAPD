const tap = require('tap');
const sinon = require('sinon');

const index = require('./index');

tap.test('files endpoint index', async test => {
  const app = {};
  const del = sinon.stub();
  const post = sinon.stub();
  const put = sinon.stub();

  index(app, del, post, put);

  test.ok(del.calledWith(app), 'delete endpoint is setup');
  test.ok(post.calledWith(app), 'post endpoint is setup');
  test.ok(put.calledWith(app), 'put endpoint is setup');
});
