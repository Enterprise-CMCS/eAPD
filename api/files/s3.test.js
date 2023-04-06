import { createSandbox } from 'sinon';
import tap from 'tap';
import { getFile, putFile } from './s3.js';

const sandbox = createSandbox();

tap.test('AWS S3 file storage module', async tests => {
  const S3 = sandbox.stub();
  const s3Proto = {
    getObject: sandbox.stub(),
    putObject: sandbox.stub()
  };

  tests.beforeEach(async () => {
    process.env.AWS_ACCESS_KEY_ID = 'aws access key id';
    process.env.AWS_SECRET_ACCESS_KEY = 'aws secret access key';
    process.env.FILE_S3_BUCKET = 's3 bucket path';

    sandbox.resetBehavior();
    sandbox.resetHistory();

    S3.returns(s3Proto);
    s3Proto.getObject.resolves({
      Body: [
        Promise.resolve('chunk'),
        Promise.resolve('of'),
        Promise.resolve('file')
      ]
    });
    s3Proto.putObject.resolves({ success: true });
  });

  tests.test(
    'returns functions that always reject if FILE_S3_BUCKET is missing',
    async test => {
      delete process.env.FILE_S3_BUCKET;

      test.rejects(() => getFile());
      test.rejects(() => putFile());
    }
  );

  tests.test(
    'returns functions that always reject if AWS_ACCESS_KEY_ID is missing',
    async test => {
      delete process.env.AWS_ACCESS_KEY_ID;

      test.rejects(() => getFile());
      test.rejects(() => putFile());
    }
  );

  tests.test(
    'returns functions that always reject if AWS_SECRET_ACCESS_KEY is missing',
    async test => {
      delete process.env.AWS_SECRET_ACCESS_KEY;

      test.rejects(() => getFile());
      test.rejects(() => putFile());
    }
  );

  tests.test('can get a file from S3 storage', async getTests => {
    getTests.test(
      'rejects if there is an error reading the file',
      async test => {
        s3Proto.getObject.rejects();
        test.rejects(() => getFile('file id', { S3 }));
        test.ok(S3.calledWith({ apiVersion: '2006-03-01' }));
        test.ok(
          s3Proto.getObject.calledWith({
            Bucket: 's3 bucket path',
            Key: 'file id'
          })
        );
      }
    );

    getTests.test('returns data if it can read the file', async test => {
      const buffer = Buffer('this is the data');
      s3Proto.getObject.resolves({
        Body: [Promise.resolve(buffer)]
      });
      const data = await getFile('file id', { S3 });
      test.equal(data.toString(), buffer.toString());
      test.ok(S3.calledWith({ apiVersion: '2006-03-01' }));
      test.ok(
        s3Proto.getObject.calledWith({
          Bucket: 's3 bucket path',
          Key: 'file id'
        })
      );
    });
  });

  tests.test('can put a file into S3 storage', async putTests => {
    putTests.test(
      'rejects if there is an error writing the file',
      async test => {
        s3Proto.putObject.rejects();
        test.rejects(() => putFile('file id', 'file buffer data', { S3 }));
        test.ok(S3.calledWith({ apiVersion: '2006-03-01' }));
        test.ok(
          s3Proto.putObject.calledWith({
            Body: 'file buffer data',
            Bucket: 's3 bucket path',
            ContentType: 'binary',
            Key: 'file id'
          })
        );
      }
    );

    putTests.test('resolves if it can write the file', async test => {
      s3Proto.putObject.resolves();
      test.resolves(() => putFile('file id', 'file buffer data', { S3 }));
      test.ok(S3.calledWith({ apiVersion: '2006-03-01' }));
      test.ok(
        s3Proto.putObject.calledWith({
          Body: 'file buffer data',
          Bucket: 's3 bucket path',
          ContentType: 'binary',
          Key: 'file id'
        })
      );
    });
  });
});
