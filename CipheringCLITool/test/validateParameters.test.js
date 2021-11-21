const { expect } = require("@jest/globals");
const getParameters = require("../src/validateParameters");

describe("Проверка параметров и формирование обьекта с параметрами", () => {
  test("Параметры верны", () => {
    const param = [
      "",
      "",
      "-c",
      "C0-A-R0-C1",
      "-i",
      "./input.txt",
      "-o",
      "./output.txt",
    ];

    const obj = {
      config: ["C0", "A", "R0", "C1"],
      input: "./input.txt",
      output: "./output.txt",
    };

    expect(getParameters(param)).toEqual(obj);
  });

  test("не валидный параметр конфигурации", () => {
    const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {});
    const param = ["", "", "-c", "A1"];

    expect(getParameters(param)).toEqual(undefined);
  });

  test("пользователь передает аргумент -i с несуществующим путем или без доступа для чтения", () => {
    const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {});
    const param = ["", "", "-c", "A", "-i", "aa"];

    expect(getParameters(param)).toEqual(undefined);
  });

  test("пользователь передает аргумент -o с путем к каталогу, который не существует или не имеет доступа для чтения", () => {
    const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {});
    const param = ["", "", "-c", "A", "-o", "aa"];

    expect(getParameters(param)).toEqual(undefined);
  });
});
