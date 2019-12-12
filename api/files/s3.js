const awsS3 = require('aws-sdk/clients/s3');

if (!process.env.FILE_S3_BUCKET) {
  module.exports = {
    getFile: () => Promise.reject(new Error('No S3 bucket specified')),
    putFile: () => Promise.reject(new Error('No S3 bucket specified'))
  };
} else if (
  !process.env.AWS_ACCESS_KEY_ID ||
  !process.env.AWS_SECRET_ACCESS_KEY
) {
  module.exports = {
    getFile: () => Promise.reject(new Error('No AWS credentials specified')),
    putFile: () => Promise.reject(new Error('No AWS credentials specified'))
  };
} else {
  const getFile = async (id, { S3 = awsS3 } = {}) =>
    new S3({ apiVersion: '2006-03-01' })
      .getObject({
        Bucket: process.env.FILE_S3_BUCKET,
        Key: id
      })
      .promise()
      .then(data => data.Body);

  const putFile = async (id, buffer, { S3 = awsS3 } = {}) =>
    new S3({ apiVersion: '2006-03-01' })
      .putObject({
        Body: buffer,
        Bucket: process.env.FILE_S3_BUCKET,
        ContentType: 'binary',
        Key: id
      })
      .promise();

  module.exports = { getFile, putFile };
}
