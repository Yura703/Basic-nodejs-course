const { stdout, stdin, stderr, exit } = process;
const parameters = require("./validateParameters");
const receivePatchFile = require("./validate/receivePatchFile");
const {
  ReadStream,
  WriteStream,
  TransformROT8Stream,
  TransformAtbashStream,
  TransformCaesarStream,
} = require("./streams/streams");
const ParameterError = require("./errors/ParameterError");
const { typeCipher } = require("./resourses");

const ENCODING = true;
const DECODING = false;
const DEFAULT_INPUT = "i";
const DEFAULT_OUTPUT = "o";

function arrayStream() {
  let arrayStreams = [];

  arrayStreams[0] =
    parameters.input === DEFAULT_INPUT
      ? stdin
      : new ReadStream(receivePatchFile(true));

  try {
    for (let i = 0; i < parameters.config.length; i++) {
      switch (parameters.config[i]) {
        case typeCipher[0]:
          arrayStreams.push(new TransformCaesarStream(DECODING));
          break;

        case typeCipher[1]:
          arrayStreams.push(new TransformCaesarStream(ENCODING));
          break;

        case typeCipher[2]:
          arrayStreams.push(new TransformROT8Stream(DECODING));
          break;

        case typeCipher[3]:
          arrayStreams.push(new TransformROT8Stream(ENCODING));
          break;

        case typeCipher[4]:
          arrayStreams.push(new TransformAtbashStream());
          break;

        default:
          throw new ParameterError('Error "config".');
      }
    }
  } catch (error) {
    stderr.write("Error: " + error.message);
    exit(1);
  }

  arrayStreams.push(
    parameters.output === DEFAULT_OUTPUT
      ? stdout
      : new WriteStream(receivePatchFile(false))
  );

  return arrayStreams;
}

module.exports = arrayStream();
