const { pipeline } = require('stream');
const arrayStreams = require('./toArrayStreams');
    
pipeline(
    arrayStreams,
    (err) => {
        if (err) {
          console.error('Pipeline failed.', err);
        } else {
          console.log('Pipeline succeeded.');
        }
      }
    );