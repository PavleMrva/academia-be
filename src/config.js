const env = process.env.NODE_ENV || 'production';

module.exports = {
  env,
  dev: env === 'development',
  prod: env === 'production',
  test: env === 'test',

  version: require('../package.json').version ?? null,

  nodePort: 3050,
  apiKey: process.env.API_KEY,

  s3: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    bucket: process.env.S3_BUCKET,
    region: process.env.S3_REGION,
  },
};
