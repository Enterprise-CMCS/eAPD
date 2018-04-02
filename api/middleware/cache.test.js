const tap = require('tap');
const sinon = require('sinon');

const { cache, modelIndex } = require('./cache');

tap.test('middleware cache', async cacheTests => {
  const key1 = ['something', 1, {}];
  const key2 = ['another', 2];

  cacheTests.test('gets middleware from cache', async test => {
    const middleware1 = {};
    const middleware2 = {};

    const getter1 = sinon.stub().returns(middleware1);
    const getter2 = sinon.stub().returns(middleware2);

    const out1 = cache(key1, getter1);
    const out2 = cache(key2, getter2);
    const out3 = cache(key1, getter1);

    test.ok(getter1.calledOnce, 'first middleware getter is only called once');
    test.ok(getter2.calledOnce, 'second middleware getter is only called once');
    test.equal(
      out1,
      out3,
      'returns the same thing on subsequent cache calls with the same key'
    );
    test.equal(
      out1,
      middleware1,
      'returns the result of the first middleware getter'
    );
    test.notEqual(out1, out2, 'returns the right middleware based on the key');
    test.equal(
      out2,
      middleware2,
      'returns the result of the second middleware getter'
    );
  });
});

tap.test('model indexer', async modelIndexTest => {
  const model1 = {};
  const model2 = {};

  modelIndexTest.test('returns a number for a model', async test => {
    const index1 = modelIndex(model1);
    const index2 = modelIndex(model2);
    const index3 = modelIndex(model1);

    test.type(index1, 'number', 'returns a number for the first object');
    test.type(index2, 'number', 'returns a number for the second object');
    test.notEqual(
      index1,
      index2,
      'the numbers for the two different objects are not the same'
    );
    test.equal(index1, index3, 'gives the same number for the same object');
  });
});
