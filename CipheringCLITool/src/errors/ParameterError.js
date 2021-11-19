class ParameterError extends Error {
  constructor(message) {
    super(message);
    this.name = "ParameterError";
    this.message = "\x1b[31m" + message + "\x1b[0m";
  }
}

module.exports = ParameterError;
