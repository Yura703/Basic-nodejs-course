const { Transform } = require('stream');
const coding = require('../encryption.js');

class TransformAtbashStream extends Transform {
    constructor() {
        super();
    }
    
    _transform(chunk, encoding, callback){
      const encryptionString = coding(chunk.toString(), "Atbash");
      this.push(encryptionString);
      callback();
    }

    // _flush(callback){
    //   this.push('\n');
    //   callback();
    // }
  }
  
module.exports = TransformAtbashStream;