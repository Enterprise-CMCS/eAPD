import tap from 'tap';
import { getFile as localGetFile, putFile as localPutFile } from './local.js';
import { getFile as s3getFile, putFile as s3putFile } from './s3.js';

// adding a random string to the end of the import will force it to import again
const getModules = async () => import(`./index.js#${Math.random()}`);

tap.test('file storage index', async tests => {
  tests.test(
    'returns the local store provider by default if unconfigured',
    async test => {
      delete process.env.FILE_STORE;
      const { getFile, putFile } = await getModules();

      test.same(getFile.toString(), localGetFile.toString());
      test.same(putFile.toString(), localPutFile.toString());
    }
  );

  tests.test(
    'returns the local store provider if configured for unrecognized',
    async test => {
      process.env.FILE_STORE = 'who even knows what this is';
      const { getFile, putFile } = await getModules();

      test.same(getFile, localGetFile);
      test.same(putFile, localPutFile);
    }
  );

  tests.test('returns the local store provider if configured', async test => {
    process.env.FILE_STORE = 'local';
    const { getFile, putFile } = await getModules();

    test.same(getFile, localGetFile);
    test.same(putFile, localPutFile);
  });

  tests.test('returns the S3 store provider if configured', async test => {
    process.env.FILE_STORE = 's3';
    const { getFile, putFile } = await getModules();

    test.same(getFile, s3getFile);
    test.same(putFile, s3putFile);
  });
});
