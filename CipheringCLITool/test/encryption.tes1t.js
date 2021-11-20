const { expect } = require("@jest/globals");
const encryption = require("../src/encryption");

describe("Проверка шифрования", () => {
  test("Проверяем шифрование Цезарь", () => {
    expect(encryption("aaAA123zZ", "Caesar", true)).toBe("bbBB123aA");
  });

  test("Проверяем дешифрование Цезарь", () => {
    expect(encryption("BbzZaA123+-*=фяйъисолд", "Caesar", false)).toBe(
      "AayYzZ123+-*=фяйъисолд"
    );
  });

  test("Проверяем шифрование ROT-8", () => {
    expect(encryption("acAC123", "ROT-8", true)).toBe("ikIK123");
  });

  test("Проверяем дешифрование ROT-8", () => {
    expect(encryption("acAC123", "ROT-8", false)).toBe("suSU123");
  });

  test("Проверяем шифрование Atbash", () => {
    expect(encryption("acAC123mNOpфыв", "Atbash")).toBe("zxZX123nMLkфыв");
  });
});
