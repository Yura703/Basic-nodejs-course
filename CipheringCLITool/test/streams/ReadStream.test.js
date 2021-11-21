const { expect } = require("@jest/globals");
const ReadStream = require("../../src/streams/ReadStream");

describe("Проверка ReadStream", () => {
  test("ReadStream", async () => {
    const rs = new ReadStream(
      "e:\\RSSchool\\NodeJS\\Basic-nodejs-course\\CipheringCLITool\\input.txt"
    );
    await expect(
      new Promise((resolve) => {
        rs.on("data", (data) => {
          resolve(data.toString("utf8"));
        });
      })
    ).resolves.toBe('This is secret. Message about "_" symbol!');
  });
});
