class FileError extends Error {
    constructor(message) {
      super(message);
      this.name = "FileError";
      this.message = '\x1b[31m' + message + '\x1b[0m';
    }
  }

  module.exports = FileError;  