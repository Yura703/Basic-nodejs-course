const { expect } = require("@jest/globals");
const validateConfig = require("../../src/validate/validateConfig");
const ParameterError = require("../../src/errors/ParameterError");

describe("Проверка config", () => {
  test("Config передан без параметров", () => {
    const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {});
    parameters1 = ["-i", "./input", "-o", "./output"];
    parameters2 = ["-c"];

    expect(() => validateConfig(parameters1)).toThrow("not config");
    expect(() => validateConfig(parameters2)).toThrow("Missing option config");
  });

  test("Config параметры не соответствуют условию", () => {
    const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {});
    parameters1 = ["-c", "C1-C0-A-R0-A1"];
    parameters2 = ["--config", "C1-C0-A-R0-A1"];

    expect(() => validateConfig(parameters1)).toThrow(
      'Option "config" does not meet the required parameters.'
    );
    expect(() => validateConfig(parameters2)).toThrow(
      'Option "config" does not meet the required parameters.'
    );
  });

  test("Config дублируется", () => {
    const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {});
    parameters = ["-c", "C1-C0-A-R0-A1", "--config"];

    expect(() => validateConfig(parameters)).toThrow("config double");
  });
});
