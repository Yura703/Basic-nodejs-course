const { expect } = require("@jest/globals");
const path = require("path");
const receivePatchFile = require("../../src/validate/receivePatchFile");
//const validateParameters = require("../../src/validateParameters");

const obj = {
  config: ["C0"],
  input: "./input.txt",
  output: "./output.txt",
};

const pathInput = path.join(__dirname, "../../", obj.input);
const pathOutput = path.join(__dirname, "../../", obj.output);

//const myMock = jest.fn(() => obj);

jest.mock("../../src/validateParameters", () => obj);

describe("Формирование пути файла", () => {
  test("aaaaa", () => {
    expect(receivePatchFile(true)).toBe(pathInput);
  });

  test("aaaaa", () => {
    expect(receivePatchFile(false)).toBe(pathOutput);
  });
});
const obj1 = {
  config: ["C0"],
  input: pathInput,
  output: pathOutput,
};
//jest.mock("../../src/validateParameters", () => obj1);
describe("Name of the group", () => {
  test("aaaaa", () => {
    expect(receivePatchFile(true)).toBe(pathInput);
  });

  test("aaaaa", () => {
    expect(receivePatchFile(false)).toBe(pathOutput);
  });
});

//validateParameters.mockClear();
