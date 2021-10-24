const env = process.env.NODE_ENV || 'production';
const argon2 = require('argon2');

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

  passwordHashingParams: {
    type: argon2.argon2id,
    saltLength: 16,
    hashLength: 32,
    parallelism: 1,
    timeCost: 2,
    memoryCost: 65536,
    version: 19,
  },
};
