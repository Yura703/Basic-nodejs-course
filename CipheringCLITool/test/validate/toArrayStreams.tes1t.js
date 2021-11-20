const { expect } = require("@jest/globals");
const arrayStream = require("../../src/toArrayStreams");

describe("Проверка подготовки массива стримов", () => {
  test("Не верный конфиг, выброс ошибки", () => {
    const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {});
    const obj = {
      config: ["C2"],
      input: "i",
      output: "o",
    };

    expect(() => arrayStream(obj)).toThrow('Error "config".');
  });

  test("Формирование массива из 8 стримов", () => {
    const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {});
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
    const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {});
    const obj = {
      config: ["C0"],
      input: "i",
      output: "./output.txt",
    };

    expect(typeof arrayStream(obj)).toEqual("object");
    expect(arrayStream(obj).length).toEqual(3);
  });

  test("Формирование массива с кастомным read стримoм", () => {
    const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {});
    const obj = {
      config: ["C0"],
      input: "./input.txt",
      output: "o",
    };

    expect(typeof arrayStream(obj)).toEqual("object");
    expect(arrayStream(obj).length).toEqual(3);
  });
});
