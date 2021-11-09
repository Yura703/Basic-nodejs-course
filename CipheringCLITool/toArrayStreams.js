const { stdout, stdin } = process;
const path = require('path');
const parameters = require('./validateParameters');
const readStream = require('./streams/ReadStream');
const writeStream = require('./streams/WriteStream');
const transformCaesarStream = require('./streams/TransformCaesarStream');
const transformROT8Stream = require('./streams/TransformROT8Stream');
const transformAtbashStream = require('./streams/TransformAtbashStream');
const ParameterError = require('./errors/ParameterError');
const { typeCipher } = require('./resourses');

const ENCODING = true;
const DECODING = false;
const DEFAULT_INPUT = 'i';
const DEFAULT_OUTPUT = 'o';

function arrayStream() {
    let arrayStreams = [];

    arrayStreams[0] = parameters.input === DEFAULT_INPUT ? stdin : new readStream(getFilePath(true));  
        
    for (let i = 0; i < parameters.config.length; i++) {
        switch (parameters.config[i]) {
            case typeCipher[0]:
                arrayStreams.push(new transformCaesarStream(DECODING));
                break;
            
            case typeCipher[1]:
                arrayStreams.push(new transformCaesarStream(ENCODING));
                break;

            case typeCipher[2]:
                arrayStreams.push(new transformROT8Stream(DECODING));
                break;

            case typeCipher[3]:
                arrayStreams.push(new transformROT8Stream(ENCODING));
                break;

            case typeCipher[4]:
                arrayStreams.push(new transformAtbashStream());
                break;
        
            default:
                throw new ParameterError("Error \"config\".");
        }   
    }    
    
    arrayStreams.push(parameters.output === DEFAULT_OUTPUT ? stdout : new writeStream(getFilePath(false)));
    
    return arrayStreams;
}

function getFilePath(inputOrOutput) {
    if (inputOrOutput) {
        filePath = path.isAbsolute(parameters.input) ? parameters.input : path.join(__dirname, parameters.input);         
    }
    else {
        filePath = path.isAbsolute(parameters.output) ? parameters.output : path.join(__dirname, parameters.output);     
    }
    
    return filePath;
}

module.exports = arrayStream();