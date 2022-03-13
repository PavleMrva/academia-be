const env = process.env.NODE_ENV || 'production';
const argon2 = require('argon2');

module.exports = {
  env,
  dev: env === 'development',
  prod: env === 'production',
  test: env === 'test',

  version: require('../../package.json').version ?? null,

  nodePort: 3050,
  apiKey: process.env.API_KEY,

  jwt: {
    secretKey: process.env.JWT_SECRET_KEY,
    accessTokenInvalidationTime: process.env.JWT_ACCESS_TOKEN_INVALIDATION_TIME || '30m',
    refreshTokenInvalidationTime: process.env.JWT_REFRESH_TOKEN_INVALIDATION_TIME || '8h',
  },

  facebook: {
    clientID: process.env.FB_CLIENT_ID,
    clientSecret: process.env.FB_CLIENT_SECRET,
  },

  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },

  s3: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    bucket: process.env.S3_BUCKET,
    region: process.env.S3_REGION,
  },

  iyzipay: {
    apiKey: process.env.IYZIPAY_API_KEY,
    secretKey: process.env.IYZIPAY_SECRET_KEY,
    uri: process.env.IYZIPAY_URI,
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

  mysql: {
    username: process.env.MYSQLDB_USER,
    password: process.env.MYSQLDB_ROOT_PASSWORD,
    database: process.env.MYSQLDB_DATABASE,
  },
};
