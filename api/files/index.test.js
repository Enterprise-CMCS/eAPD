const tap = require('tap');

const getModule = () => {
  delete require.cache[require.resolve('./index')];
  return require('./index'); // eslint-disable-line global-require
};

const local = require('./local');
const s3 = require('./s3');

tap.test('file storage index', async tests => {
  tests.test(
    'returns the local store provider by default if unconfigured',
    async test => {
      delete process.env.FILE_STORE;
      const module = getModule();

      test.same(module, local);
    }
  );

  tests.test(
    'returns the local store provider if configured for unrecognized',
    async test => {
      process.env.FILE_STORE = 'who even knows what this is';
      const module = getModule();

      test.same(module, local);
    }
  );

  tests.test('returns the local store provider if configured', async test => {
    process.env.FILE_STORE = 'local';
    const module = getModule();

    test.same(module, local);
  });

  tests.test('returns the S3 store provider if configured', async test => {
    process.env.FILE_STORE = 's3';
    const module = getModule();

    test.same(module, s3);
  });
});
