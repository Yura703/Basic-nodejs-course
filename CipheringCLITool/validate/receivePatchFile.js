const path = require("path");
const parameters = require("../validateParameters");

module.exports = function getFilePath(inputOrOutput) {
  if (inputOrOutput) {
    filePath = path.isAbsolute(parameters.input)
      ? parameters.input
      : path.join(__dirname, "../", parameters.input);
  } else {
    filePath = path.isAbsolute(parameters.output)
      ? parameters.output
      : path.join(__dirname, "../", parameters.output);
  }

  return filePath;
};
