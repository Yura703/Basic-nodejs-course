const { flags, stringFlags } = require("./resourses");
const { validateConfig, validateArguments } = require("./validate/validate");
const { checkAvailabilityFile, canWrite, canRead, isFolder } = require("./validate/validateFile");

module.exports = function getParameters(parameters) {
  try {
    validateConfig(parameters);
    validateArguments(parameters);

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
    process.stderr.write("Error: " + error.message);
    process.exit(1);
  }
};
