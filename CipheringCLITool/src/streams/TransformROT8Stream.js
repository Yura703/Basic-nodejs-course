const { Transform } = require("stream");
const coding = require("../encryption.js");
class TransformROT8Stream extends Transform {
  constructor(directionEncryption) {
    super(directionEncryption);
    this.directionEncryption = directionEncryption;
  }

  _transform(chunk, encoding, callback) {
    const encryptionString = coding(
      chunk.toString(),
      "ROT-8",
      this.directionEncryption
    );
    this.push(encryptionString);
    callback();
  }
}

module.exports = TransformROT8Stream;
