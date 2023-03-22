import { S3 as awsS3 } from '@aws-sdk/client-s3';

const config = {
  apiVersion: '2006-03-01'
};

if (process.env.AWS_REGION) {
  config.region = process.env.AWS_REGION;
}

export const getFile = async (id, { S3 = awsS3 } = {}) => {
  if (!process.env.FILE_S3_BUCKET) {
    return Promise.reject(new Error('No S3 bucket specified'));
  }
  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    return Promise.reject(new Error('No AWS credentials specified'));
  }

  const client = new S3(config);

  const s3ResponseStream = (
    await client.getObject({
      Bucket: process.env.FILE_S3_BUCKET,
      Key: id
    })
  ).Body;
  const chunks = [];

  for await (const chunk of s3ResponseStream) {
    chunks.push(chunk);
  }

  return Buffer.concat(chunks);
};

export const putFile = async (id, buffer, { S3 = awsS3 } = {}) => {
  if (!process.env.FILE_S3_BUCKET) {
    return Promise.reject(new Error('No S3 bucket specified'));
  }
  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    return Promise.reject(new Error('No AWS credentials specified'));
  }

  const client = new S3(config);

  return client.putObject({
    Body: buffer,
    Bucket: process.env.FILE_S3_BUCKET,
    ContentType: 'binary',
    Key: id
  });
};
