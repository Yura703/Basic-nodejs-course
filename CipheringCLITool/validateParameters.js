const { stderr, exit } = process;
const { flags, stringFlags } = require("./resourses");
const { validateConfig, validateArguments } = require("./validate/validate");
const {
  checkAvailabilityFile,
  canWrite,
  canRead,
  isFolder,
} = require("./validate/validateFile");

const parameters = process.argv.slice(2);

try {
  validateConfig(parameters);
  validateArguments(parameters);
} catch (error) {
  stderr.write("Error: " + error.message);
  exit(1);
}

module.exports = (function getParameters() {
  try {
    for (let i = 0; i < parameters.length; i++) {
      const nextParameter = parameters[i + 1];
      if (parameters[i] === "-c" || parameters[i] === "--config") {
        flags.config = nextParameter.split("-");
      }

      if (parameters[i] === "-i" || parameters[i] === "--input") {
        checkAvailabilityFile(nextParameter);
        canRead(nextParameter);
        isFolder(nextParameter);
        flags.input = nextParameter;
      }

      if (parameters[i] === "-o" || parameters[i] === "--otput") {
        checkAvailabilityFile(nextParameter);
        canWrite(nextParameter);
        isFolder(nextParameter);
        flags.output = nextParameter;
      }
    }

    return flags;
  } catch (error) {
    stderr.write("Error: " + error.message);
    exit(1);
  }
})();
