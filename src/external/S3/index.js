const {promisify} = require('util');
const stream = require('stream');
const pipeline = promisify(stream.pipeline);
const {
  S3Client,
  ListBucketsCommand,
  GetObjectCommand,
  PutObjectCommand,
} = require('@aws-sdk/client-s3');
const {Upload} = require('@aws-sdk/lib-storage');
const {getSignedUrl} = require('@aws-sdk/s3-request-presigner');
const {createPresignedPost} = require('@aws-sdk/s3-presigned-post');
const {
  ExternalServiceUnreachable,
  ExternalServiceClientError,
} = require('../errors');

class S3Service {
  #client;
  #bucket;

  constructor({bucket, region, accessKeyId, secretAccessKey}) {
    this.#bucket = bucket;
    this.#client = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  handleError(err) {
    if (err?.$metadata?.httpStatusCode) {
      throw new ExternalServiceClientError('S3', {
        statusCode: err?.$metadata?.httpStatusCode,
        body: err.message,
      });
    }

    throw new ExternalServiceUnreachable('S3');
  }

  /**
   * Returns a readable stream
   *
   * @param {string} fileName
   */
  async getFile(fileName) {
    const params = {
      Key: fileName,
      Bucket: this.#bucket,
    };

    try {
      return await this.#client.send(new GetObjectCommand(params));
    } catch (err) {
      this.handleError(err);
    }
  }

  /**
   * Returns a writable stream to upload files, can be useful for formidable,
   * otherwise no reason to be decoupled from `uploadStream` below
   *
   * @param {string} fileName
   * @param {string} contentType
   */
  getUploadStream(fileName, contentType) {
    const pass = new stream.PassThrough();

    const upload = new Upload({
      client: this.#client,
      params: {
        Bucket: this.#bucket,
        Key: fileName,
        Body: pass,
        ContentType: contentType,
      },
    });

    upload.done();

    return pass;
  }

  /**
   * @param {string} fileName
   * @param {ReadableStream} dataStream
   * @param {string} contentType
   */
  async uploadStream(fileName, dataStream, contentType) {
    const uploadStream = this.getUploadStream(fileName, contentType);

    try {
      await pipeline(
        dataStream,
        uploadStream,
      );
    } catch (err) {
      this.handleError(err);
    }
  }

  async getHealth() {
    let error = null;

    await this.#client.send(new ListBucketsCommand({
      Bucket: this.#bucket,
    })).catch((err) => error = err);

    return {
      ok: !error,
      ...error && {error},
    };
  }
}

module.exports = S3Service;
