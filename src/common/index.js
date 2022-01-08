const {S3} = require('../external');
const {Readable} = require('stream');

class BaseError extends Error {
  constructor(statusCode, name, message, data = null) {
    super();
    this.statusCode = statusCode;
    this.name = name;
    this.message = message;
    this.data = data;
  }
}

const addFiles = async (attachments) => {
  const files = [];
  if (Array.isArray(attachments)) {
    await Promise.map(attachments, async ({name, data, mimetype}) => {
      const fileName = `${Date.now().toString()}-${name}`;
      const fileStream = Readable.from(data);
      await S3.uploadStream(fileName, fileStream, mimetype);
      files.push({name: fileName, type: mimetype});
    });
  } else {
    const fileName = `${Date.now().toString()}-${attachments.name}`;
    const fileStream = Readable.from(attachments.data);
    await S3.uploadStream(fileName, fileStream, attachments.mimetype);
    files.push({name: fileName, type: attachments.mimetype});
  }
  return files;
};

module.exports = {
  BaseError,
  addFiles,
};
