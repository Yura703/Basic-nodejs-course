const ParameterError = require("../errors/ParameterError");

module.exports = function validateConfig(parameters) {
  const index1 = parameters.indexOf("-c");
  const index2 = parameters.indexOf("--config");

  if (index1 !== -1 && index2 !== -1) {
    throw new ParameterError("config double");
  }

  if (index1 === -1 && index2 === -1) {
    throw new ParameterError("not config");
  }

  const index = index1 === -1 ? index2 : index1;

  if (parameters.length === 1 || parameters.length - 1 === index) {
    throw new ParameterError("Missing option config");
  }

  let config = parameters[index + 1].split("-");
  for (let i = 0; i < config.length; i++) {
    if (!/^\s*[CR][10]\s*$|^\s*[A]{1}\s*$/.test(config[i])) {
      throw new ParameterError(
        'Option "config" does not meet the required parameters.'
      );
    }
  }
};
