const ParameterError = require("../errors/ParameterError");
const { stringFlags } = require("../resourses");

module.exports = function validateArguments(parameters) {
  if (parameters.slice(-1)[0] === "-") {
    throw new ParameterError("the line is not correct, ends with '-'.");
  }

  for (let i = 0; i < stringFlags.length; i++) {
    let fullFlag = "";

    switch (stringFlags[i]) {
      case "-c":
        fullFlag = "--config";
        break;

      case "-o":
        fullFlag = "--output";
        break;

      case "-i":
        fullFlag = "--input";
        break;

      default:
        break;
    }

    if (
      parameters.filter((item) => item === stringFlags[i] || item === fullFlag)
        .length > 1
    ) {
      throw new ParameterError("Options are duplicated.");
    }
  }
};
