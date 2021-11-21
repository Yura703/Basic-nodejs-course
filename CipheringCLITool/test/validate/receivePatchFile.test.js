const { expect } = require("@jest/globals");
const path = require("path");
const receivePatchFile = require("../../src/validate/receivePatchFile");
const validateParameters = require("../../src/validateParameters");

const obj = {
  config: ["C0"],
  input: "./input.txt",
  output: "./output.txt",
};

const pathInput = path.join(__dirname, "../../", obj.input);
const pathOutput = path.join(__dirname, "../../", obj.output);

jest.mock("../../src/validateParameters");

describe("Формирование пути файла", () => {
  validateParameters.mockImplementation(() => {
    return obj;
  });

  test("Формируем input для относительного пути", () => {
    expect(receivePatchFile(true)).toBe(pathInput);
  });

  test("Формируем output для относительного пути", () => {
    expect(receivePatchFile(false)).toBe(pathOutput);
  });
});
const objAbsolut = {
  config: ["C0"],
  input: pathInput,
  output: pathOutput,
};

describe("Name of the group", () => {
  validateParameters.mockImplementation(() => {
    return objAbsolut;
  });

  test("Формируем input для абсолютного пути", () => {
    expect(receivePatchFile(true)).toBe(pathInput);
  });

  test("Формируем output для абсолютного пути", () => {
    expect(receivePatchFile(false)).toBe(pathOutput);
  });
});
