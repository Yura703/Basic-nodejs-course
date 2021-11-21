const { expect } = require("@jest/globals");
const arrayStream = require("../../src/toArrayStreams");
const receivePatchFile = require("../../src/validate/receivePatchFile");
const ParameterError = require("../../src/errors/ParameterError");

jest.mock("../../src/validate/receivePatchFile");

describe("Проверка подготовки массива стримов", () => {
  // beforeEach(() => {
  //   jest.resetModules();
  // });

  test("Формирование массива из 8 стримов", () => {
    const obj = {
      config: ["C0", "A", "R0", "R1", "C0", "C1"],
      input: "i",
      output: "o",
    };

    expect(typeof arrayStream(obj)).toEqual("object");
    expect(arrayStream(obj).length).toEqual(8);
    expect(arrayStream(obj)[0]).toEqual(process.stdin);
    expect(arrayStream(obj)[7]).toEqual(process.stdout);
  });

  test("Формирование массива с кастомным write стримoм", () => {
    const obj = {
      config: ["C0"],
      input: "i",
      output: "./output.txt",
    };
    receivePatchFile.mockImplementation((inputOrOutput) => {
      return inputOrOutput ? "./input.txt" : "./output.txt";
    });

    expect(typeof arrayStream(obj)).toEqual("object");
    expect(arrayStream(obj).length).toEqual(3);
  });

  test("Формирование массива с кастомным read стримoм", () => {
    const obj = {
      config: ["C0"],
      input: "./input.txt",
      output: "o",
    };
    receivePatchFile.mockImplementation((inputOrOutput) => {
      return inputOrOutput ? "./output.txt" : "./input.txt";
    });

    expect(typeof arrayStream(obj)).toEqual("object");
    expect(arrayStream(obj).length).toEqual(3);
  });

  test("Не верный конфиг, выброс ошибки", () => {
    const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {});
    const obj = {
      config: ["C2", "B", "D"],
    };
    arrayStream(obj);
    expect(mockExit).toHaveBeenCalledTimes(1);
  });
});
