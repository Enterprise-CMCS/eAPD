import tap from 'tap';
import * as local from './local.js';
import * as s3 from './s3.js';
import * as module from './index.js';

tap.test('file storage index', async tests => {
  tests.test(
    'returns the local store provider by default if unconfigured',
    async test => {
      delete process.env.FILE_STORE;

      test.same(module, local);
    }
  );

  tests.test(
    'returns the local store provider if configured for unrecognized',
    async test => {
      process.env.FILE_STORE = 'who even knows what this is';

      test.same(module, local);
    }
  );

  tests.test('returns the local store provider if configured', async test => {
    process.env.FILE_STORE = 'local';

    test.same(module, local);
  });

  tests.test('returns the S3 store provider if configured', async test => {
    process.env.FILE_STORE = 's3';

    test.same(module, s3);
  });
});
