import { createSandbox } from 'sinon';
import tap from 'tap';
import dbMock from './dbMock.test.js';
import {
  createNewFileForAPD,
  deleteFileByID,
  fileBelongsToAPD
} from './files.js';

tap.test('database wrappers / files', async filesTests => {
  const db = dbMock('apd_files');

  const sandbox = createSandbox();
  const crypto = {
    createHash: sandbox.stub(),
    update: sandbox.stub(),
    digest: sandbox.stub()
  };
  crypto.createHash.returns({ update: crypto.update });
  crypto.update.returns({ digest: crypto.digest });
  crypto.digest.returns('--- file hash ---');

  filesTests.beforeEach(async () => {
    dbMock.reset();
    sandbox.resetHistory();
  });

  filesTests.test('creates a new file for an APD', async test => {
    db.count.returnsThis();
    db.where
      .withArgs({ id: '--- file hash ---', apd_id: 'apd id' })
      .resolves([{ count: 0 }]);

    db.insert
      .withArgs({
        id: '--- file hash ---',
        apd_id: 'apd id',
        metadata: 'some metadata',
        size: 'a size'
      })
      .resolves();

    const fileID = await createNewFileForAPD(
      'file buffer',
      'apd id',
      'some metadata',
      'a size',
      { db, crypto }
    );

    test.ok(crypto.update.calledWith('file buffer'));
    test.equal(fileID, '--- file hash ---');
  });

  filesTests.test('deletes a file', async test => {
    db.where.withArgs('id', 'apd id').returnsThis();
    db.delete.resolves();

    await deleteFileByID('apd id', { db });

    test.ok(true, 'delete resolved');
  });

  filesTests.test('checks whether a file belongs to an APD', async tests => {
    tests.test(
      'returns false if the file does not belong to the APD',
      async test => {
        db.where.withArgs({ id: 'file id', apd_id: 'apd id' }).returnsThis();
        db.count.resolves([{ count: 0 }]);

        const result = await fileBelongsToAPD('file id', 'apd id', { db });

        test.equal(result, false);
      }
    );

    tests.test(
      'returns true if the file does belong to the APD',
      async test => {
        db.where.withArgs({ id: 'file id', apd_id: 'apd id' }).returnsThis();
        db.count.resolves([{ count: 1 }]);

        const result = await fileBelongsToAPD('file id', 'apd id', { db });

        test.equal(result, true);
      }
    );
  });
});
