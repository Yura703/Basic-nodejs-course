const path = require("path");
const _parameters = require("../validateParameters");

module.exports = function getFilePath(inputOrOutput) {
  parameters = _parameters(process.argv.slice(2));

  if (inputOrOutput) {
    filePath = path.isAbsolute(parameters.input) ? parameters.input : path.join(__dirname, "../../", parameters.input);
  } else {
    filePath = path.isAbsolute(parameters.output) ? parameters.output : path.join(__dirname, "../../", parameters.output);
  }

  return filePath;
};
