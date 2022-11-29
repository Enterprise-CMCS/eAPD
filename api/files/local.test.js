import systemFs from 'fs';
import { createSandbox, stub } from 'sinon';
import tap from 'tap';

const sandbox = createSandbox();

const getModule = () => {
  delete require.cache[require.resolve('./local')];
  return require('./local.js'); // eslint-disable-line global-require
};

tap.test('local file storage module', async tests => {
  const fsExistsSync = sandbox.stub(systemFs, 'existsSync');

  const fs = {
    readFile: sandbox.stub(),
    writeFile: sandbox.stub()
  };

  tests.beforeEach(async () => {
    process.env.FILE_PATH = 'local file path';

    sandbox.resetBehavior();
    sandbox.resetHistory();

    fsExistsSync.returns(true);
  });

  tests.test(
    'returns functions that always reject if FILE_PATH is missing',
    async test => {
      delete process.env.FILE_PATH;
      const { getFile, putFile } = getModule();

      test.rejects(() => getFile());
      test.rejects(() => putFile());
    }
  );

  tests.test('creates the local file path if it does not exist', async test => {
    fsExistsSync.returns(false);
    const mkdir = stub(systemFs, 'mkdirSync');

    getModule();

    test.ok(mkdir.calledWith('local file path'));

    mkdir.restore();
  });

  tests.test('can get a file from local storage', async getTests => {
    const { getFile } = getModule();

    getTests.test(
      'rejects if there is an error reading the file',
      async test => {
        fs.readFile.yields('this is an error');
        test.rejects(() => getFile('file id', { fs }));
        test.ok(fs.readFile.calledWith('local file path/file id'));
      }
    );

    getTests.test('returns data if it can read the file', async test => {
      fs.readFile.yields(null, 'this is the data');
      const data = await getFile('file id', { fs });
      test.equal(data, 'this is the data');
      test.ok(fs.readFile.calledWith('local file path/file id'));
    });
  });

  tests.test('can put a file into local storage', async putTests => {
    const { putFile } = getModule();

    putTests.test(
      'rejects if there is an error writing the file',
      async test => {
        fs.writeFile.yields('this is an error');
        test.rejects(() => putFile('file id', 'file buffer data', { fs }));
        test.ok(
          fs.writeFile.calledWith('local file path/file id', 'file buffer data')
        );
      }
    );

    putTests.test('resolves if it can write the file', async test => {
      fs.writeFile.yields(null);
      test.resolves(() => putFile('file id', 'file buffer data', { fs }));
      test.ok(
        fs.writeFile.calledWith('local file path/file id', 'file buffer data')
      );
    });
  });
});
