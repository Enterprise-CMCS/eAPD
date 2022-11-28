import tap from 'tap';
import sinon from 'sinon';
import cache from './cache';

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
    test.not(out1, out2, 'returns the right middleware based on the key');
    test.equal(
      out2,
      middleware2,
      'returns the result of the second middleware getter'
    );
  });
});
