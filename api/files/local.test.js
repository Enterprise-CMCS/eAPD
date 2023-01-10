import systemFs from 'fs';
import { createSandbox, stub, resetHistory } from 'sinon';
import tap from 'tap';

const fsExistsSync = stub(systemFs, 'existsSync');
const fsMkdirSync = stub(systemFs, 'mkdirSync');

const sandbox = createSandbox();

// adding a random string to the end of the import will force it to import again
const getModule = async () => import(`./local.js#${Math.random()}`);

tap.test('local file storage module', async tests => {
  const fs = {
    readFile: sandbox.stub(),
    writeFile: sandbox.stub()
  };

  tests.beforeEach(async () => {
    process.env.FILE_PATH = 'local file path';

    sandbox.resetBehavior();
    sandbox.resetHistory();
    resetHistory();

    fsExistsSync.returns(true);
  });

  tests.test(
    'returns functions that always reject if FILE_PATH is missing',
    async test => {
      delete process.env.FILE_PATH;
      const { getFile, putFile } = await getModule();

      test.rejects(() => getFile());
      test.rejects(() => putFile());
    }
  );

  tests.test('creates the local file path if it does not exist', async test => {
    fsExistsSync.callsFake(() => false);

    await getModule();

    test.ok(fsMkdirSync.calledWith('local file path'));
  });

  tests.test('can get a file from local storage', async getTests => {
    const { getFile } = await getModule();

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
    const { putFile } = await getModule();

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
