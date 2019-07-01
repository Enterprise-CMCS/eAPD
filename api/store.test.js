const tap = require('tap');
const sinon = require('sinon');
const { ReadableMock } = require('stream-mock');

const store = require('./store');

tap.test('file/blob store', async tests => {
  const sandbox = sinon.createSandbox();

  const mockStore = {
    createReadStream: sandbox.stub(),
    createWriteStream: sandbox.stub(),
    exists: sandbox.stub(),
    remove: sandbox.stub()
  };

  store.store = mockStore;

  tests.beforeEach(async () => {
    sandbox.resetBehavior();
    sandbox.resetHistory();
  });

  tests.test('checks if a blob exists', async existTests => {
    existTests.test(
      'handles an error from the underlying blob store',
      async test => {
        const err = new Error('an error');
        mockStore.exists.yields(err, null);
        try {
          await store.exists('key');
          test.ok(false, 'rejects with the expected error');
        } catch (e) {
          test.equal(e, err, 'rejects with the expected error');
          test.ok(
            mockStore.exists.calledWith('key'),
            'underlying store is called'
          );
        }
      }
    );

    existTests.test('gives back the answer', async test => {
      mockStore.exists.yields(null, 'something something something, dark side');
      const out = await store.exists('key');

      test.equal(
        out,
        'something something something, dark side',
        'resolved the result from the underlying store'
      );
      test.ok(mockStore.exists.calledWith('key'), 'underlying store is called');
    });
  });

  tests.test('gets data from a blob', async getTests => {
    getTests.test('rejects if there is an error', async test => {
      const readStream = {
        on: sinon.stub()
      };
      mockStore.createReadStream.returns(readStream);

      const err = new Error('err');
      readStream.on.withArgs('error').yields(err);

      try {
        await store.get('key');
      } catch (e) {
        test.equal(e, err, 'rejects with the expected error');
        test.ok(
          mockStore.createReadStream.calledWith('key'),
          'underlying store is called'
        );
      }
    });

    getTests.test('resolves data if there is no error', async test => {
      const readStream = new ReadableMock(['hello', 'world', 'zip', 'zorp']);
      mockStore.createReadStream.returns(readStream);
      const out = await store.get('key');

      test.equal(out, 'helloworldzipzorp', 'resolves with the expected data');
      test.ok(
        mockStore.createReadStream.calledWith('key'),
        'underlying store is called'
      );
    });
  });

  tests.test('gets readable stream for a blob', async test => {
    mockStore.createReadStream.returns('bob');
    const out = store.getReadStream('key');

    test.equal(out, 'bob', 'returns the expected value');
    test.ok(
      mockStore.createReadStream.calledWith('key'),
      'underlying store is called'
    );
  });

  tests.test('removes a blob', async test => {
    mockStore.remove.yields();
    await store.remove('key');
    test.ok(mockStore.remove.calledWith('key'), 'underlying store is called');
  });

  tests.test('writes to a blob', async writeTests => {
    writeTests.test(
      'writes from a stream, encounters read error',
      async test => {
        const writeStream = { end: sinon.spy(), on: sinon.spy() };
        mockStore.createWriteStream.returns(writeStream);

        const err = new Error('err');

        const readStream = new ReadableMock([]);
        readStream.pipe = sinon.spy();
        readStream.on = sinon.stub();
        readStream.on.withArgs('error').yields(err);

        try {
          await store.write('key', readStream);
          test.ok(false, 'rejects with the expected error');
        } catch (e) {
          test.equal(e, err, 'rejects with the expected error');
          test.ok(
            readStream.pipe.calledWith(writeStream),
            'stream is piped to the blob'
          );
          test.ok(
            mockStore.createWriteStream.calledWith('key'),
            'underlying store is called'
          );
        }
      }
    );

    writeTests.test(
      'writes from a stream, encounters write error',
      async test => {
        const err = new Error('err');

        const writeStream = {
          end: sinon.spy(),
          on: sinon
            .stub()
            .withArgs('error')
            .yields(err)
        };
        mockStore.createWriteStream.returns(writeStream);

        const readStream = new ReadableMock([]);
        readStream.pipe = sinon.spy();
        readStream.on = sinon.stub();

        try {
          await store.write('key', readStream);
          test.ok(false, 'rejects with the expected error');
        } catch (e) {
          test.equal(e, err, 'rejects with the expected error');
          test.ok(
            readStream.pipe.calledWith(writeStream),
            'stream is piped to the blob'
          );
          test.ok(
            mockStore.createWriteStream.calledWith('key'),
            'underlying store is called'
          );
        }
      }
    );

    writeTests.test('writes from a stream, without error', async test => {
      const writeStream = { end: sinon.spy(), on: sinon.spy() };
      mockStore.createWriteStream.returns(writeStream);

      const readStream = new ReadableMock([]);
      readStream.pipe = sinon.spy();
      readStream.on = sinon
        .stub()
        .withArgs('close')
        .yields();

      await store.write('key', readStream);

      test.ok(
        readStream.pipe.calledWith(writeStream),
        'stream is piped to the blob'
      );
      test.ok(
        mockStore.createWriteStream.calledWith('key'),
        'underlying store is called'
      );
    });

    writeTests.test(
      'writes non-stream data directly, encounters an error',
      async test => {
        const writeStream = {
          write: sinon.spy(),
          end: sinon.spy(),
          on: sinon.stub()
        };
        const err = new Error('boop');
        writeStream.on.withArgs('error').yields(err);

        mockStore.createWriteStream.returns(writeStream);

        try {
          await store.write('key', 'write this blob!');
        } catch (e) {
          test.equal(e, err, 'rejects with the expected error');
          test.ok(
            writeStream.write.calledWith('write this blob!'),
            'data is written to the stream'
          );
          test.ok(
            mockStore.createWriteStream.calledWith('key'),
            'underlying store is called'
          );
        }
      }
    );
    writeTests.test(
      'writes non-stream data directly, without error',
      async test => {
        const writeStream = {
          write: sinon.spy(),
          end: sinon.stub(),
          on: sinon.spy()
        };
        writeStream.end.yields();

        mockStore.createWriteStream.returns(writeStream);

        await store.write('key', 'write this blob!');

        test.ok(
          writeStream.write.calledWith('write this blob!'),
          'data is written to the stream'
        );
        test.ok(
          mockStore.createWriteStream.calledWith('key'),
          'underlying store is called'
        );
      }
    );
  });
});
