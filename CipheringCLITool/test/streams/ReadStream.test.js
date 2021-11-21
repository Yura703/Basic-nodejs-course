const { expect } = require("@jest/globals");
const ReadStream = require("../../src/streams/ReadStream");
const path = require("path");

describe("Проверка ReadStream", () => {
  test("ReadStream", async () => {
    const _path = path.join(__dirname, "../../input.txt");
    const rs = new ReadStream(_path);
    await expect(
      new Promise((resolve) => {
        rs.on("data", (data) => {
          resolve(data.toString("utf8"));
        });
      })
    ).resolves.toBe('This is secret. Message about "_" symbol!');
  });
});
