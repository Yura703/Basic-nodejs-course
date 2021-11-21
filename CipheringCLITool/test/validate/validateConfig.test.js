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

  test("Пользователь передает правильную последовательность символов в качестве аргумента для --config, который соответствует регулярному выражению; Результат: тест пройден. сценарии использования шифров из примеров использования первого описания задачи", () => {
    //const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {});
    parameters1 = [
      "-c",
      "C1-C1-R0-A",
      "-i",
      "./input.txt",
      "-o",
      "./output.txt",
    ];
    parameters2 = [
      "-c",
      "C1-C0-A-R1-R0-A-R0-R0-C1-A",
      "-i",
      "./input.txt",
      "-o",
      "./output.txt",
    ];
    parameters3 = [
      "-c",
      "A-A-A-R1-R0-R0-R0-C1-C1-A",
      "-i",
      "./input.txt",
      "-o",
      "./output.txt",
    ];
    parameters4 = [
      "-c",
      "C1-R1-C0-C0-A-R0-R1-R1-A-C1",
      "-i",
      "./input.txt",
      "-o",
      "./output.txt",
    ];

    expect(() => validateConfig(parameters1)).not.toThrow(Error);
    expect(() => validateConfig(parameters2)).not.toThrow(Error);
    expect(() => validateConfig(parameters3)).not.toThrow(Error);
    expect(() => validateConfig(parameters4)).not.toThrow(Error);
  });
});
