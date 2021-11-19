const { expect } = require("@jest/globals");
const { validateArguments } = require("../../src/validate/validateArguments");

describe("Проверка ввода аргументов", () => {
  //node my_caesar_cli -c C1-C1-A-R0 -c C0
  test("аргумент дублируется", () => {
    expect(() => validateArguments(undefined)).toThrow(
      `Error: You provided -c argument more than once`
    );
  });

  test("не переданы  -c или --config", () => {});

  //'инпут не существует или не имеет доступа для чтения'

  // оутпут не существует или не имеет доступа для записи или он каталог

  test("неверные символы в конфиге", () => {});

  //верный конфиг в регулярном выражении => тест пройден

  //сценарии взять из первого задания
  test("User passes correct sequence of symbols as argument for --config that matches regular expression", () => {});
});
