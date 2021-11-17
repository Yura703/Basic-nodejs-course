const ParameterError = require("../errors/ParameterError");

module.exports = function validateConfig(parameters) {
  //сделать вадидацию по полному и короткому имени
  const index = parameters.indexOf("-c" || "--config");
  if (
    index === -1 ||
    parameters.length === 1 ||
    parameters.length - 1 === index
  ) {
    throw new ParameterError('Missing option "config".');
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
