const config = require('../config');
const S3Service = require('./S3');
const IyzipayService = require('./iyzipay');

const S3 = new S3Service({
  bucket: config.s3.bucket,
  region: config.s3.region,
  accessKeyId: config.s3.accessKeyId,
  secretAccessKey: config.s3.secretAccessKey,
});

const Iyzipay = new IyzipayService({
  apiKey: config.iyzipay.apiKey,
  secretKey: config.iyzipay.secretKey,
  uri: config.iyzipay.uri,
});

module.exports = {
  S3,
  Iyzipay,
};
