const sinon = require('sinon');
const tap = require('tap');
const dbMock = require('./dbMock.test');

const {
  createNewFileForAPD,
  deleteFileByID,
  fileBelongsToAPD
} = require('./files');

tap.test('database wrappers / files', async filesTests => {
  const db = dbMock('apd_files');

  filesTests.beforeEach(async () => {
    dbMock.reset();
  });

  filesTests.test('creates a new file for an APD', async test => {
    db.insert
      .withArgs({
        id: 'uuid',
        apd_id: 'apd id',
        metadata: 'some metadata',
        size: 'a size'
      })
      .resolves();

    const uuid = sinon.stub().returns('uuid');

    const fileID = await createNewFileForAPD(
      'apd id',
      'some metadata',
      'a size',
      { db, uuid }
    );

    test.equal(fileID, 'uuid');
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
