const ParameterError = require("../errors/ParameterError");
const { stringFlags } = require("../resourses");

module.exports = function validateArguments(parameters) {
  if (parameters.slice(-1)[0] === "-") {
    throw new ParameterError("the line is not correct, ends with -");
  }

  for (let i = 0; i < stringFlags.length; i++) {
    let twinFlag = "";

    switch (stringFlags[i]) {
      case "-c":
        twinFlag = "--config";
        break;

      case "--config":
        twinFlag = "-c";
        break;

      case "-o":
        twinFlag = "--output";
        break;

      case "--output":
        twinFlag = "-o";
        break;

      case "-i":
        twinFlag = "--input";
        break;

      case "--input":
        twinFlag = "-i";
        break;

      default:
        break;
    }

    if (
      parameters.filter((item) => item === stringFlags[i] || item === twinFlag)
        .length > 1
    ) {
      throw new ParameterError(
        `Error: You provided ${stringFlags[i]} argument more than once`
      );
    }
  }
};
