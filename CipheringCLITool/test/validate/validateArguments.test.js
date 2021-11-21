const { expect } = require("@jest/globals");
const validateArguments = require("../../src/validate/validateArguments");

describe("Проверка ввода аргументов", () => {
  test("аргумент '-c' дублируется", () => {
    const parametersArray = ["--config", "C1-C1-A-R0", "-c", "C0"];

    expect(() => validateArguments(parametersArray)).toThrow(
      `Error: You provided -c argument more than once`
    );
  });

  test("аргумент '-i' дублируется", () => {
    const parametersArray = ["--config", "A", "-i", "./input.txt", "-i"];

    expect(() => validateArguments(parametersArray)).toThrow(
      `Error: You provided -i argument more than once`
    );
  });

  test("аргумент '-o' дублируется", () => {
    const parametersArray = ["-c", "C1", "-o", "../../input.txt", "-o"];

    expect(() => validateArguments(parametersArray)).toThrow(
      `Error: You provided -o argument more than once`
    );
  });

  test("аргумент дублируется при разных типах (-с и --config)", () => {
    const parametersArray = ["-c", "C1", "--config", "C0"];

    expect(() => validateArguments(parametersArray)).toThrow(
      `Error: You provided -c argument more than once`
    );
  });

  test("аргумент дублируется при полном типе (--config)", () => {
    const parametersArray = ["--config", "C1", "--config", "C0"];

    expect(() => validateArguments(parametersArray)).toThrow(
      `Error: You provided -c argument more than once`
    );
  });

  test('параметры завершаются на "-"', () => {
    const parametersArray = ["-c", "C1", "-"];

    expect(() => validateArguments(parametersArray)).toThrow(
      "the line is not correct, ends with -"
    );
  });
});
