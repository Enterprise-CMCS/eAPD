import awsS3 from 'aws-sdk/clients/s3';

export const getFile = async (id, { S3 = awsS3 } = {}) => {
  if (!process.env.FILE_S3_BUCKET) {
    return Promise.reject(new Error('No S3 bucket specified'));
  }
  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    return Promise.reject(new Error('No AWS credentials specified'));
  }
  return new S3({ apiVersion: '2006-03-01' })
    .getObject({
      Bucket: process.env.FILE_S3_BUCKET,
      Key: id
    })
    .promise()
    .then(data => data.Body);
};

export const putFile = async (id, buffer, { S3 = awsS3 } = {}) => {
  if (!process.env.FILE_S3_BUCKET) {
    return Promise.reject(new Error('No S3 bucket specified'));
  }
  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    return Promise.reject(new Error('No AWS credentials specified'));
  }
  return new S3({ apiVersion: '2006-03-01' })
    .putObject({
      Body: buffer,
      Bucket: process.env.FILE_S3_BUCKET,
      ContentType: 'binary',
      Key: id
    })
    .promise();
};
