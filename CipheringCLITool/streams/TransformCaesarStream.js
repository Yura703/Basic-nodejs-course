const { Transform } = require('stream');
const coding = require('../encryption.js');

class TransformCaesarStream extends Transform {
    constructor(directionEncryption) {
        super(directionEncryption);
        this.directionEncryption = directionEncryption;
    }
    
    _transform(chunk, encoding, callback){
      const encryptionString = coding(chunk.toString(), "Caesar", this.directionEncryption);
      this.push(encryptionString);
      callback();
    }

    // _flush(callback){
    //   this.push('\n');
    //   callback();
    // }
  }
  
module.exports = TransformCaesarStream;