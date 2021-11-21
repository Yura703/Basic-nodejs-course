const { expect } = require("@jest/globals");
const { pipeline } = require("stream");
const { spawn } = require("child_process");
const index = require("../index");
//const parameters = require("../src/validateParameters");
const paramArgv = require("../paramArgv");

// const mockExit = jest
//   .spyOn(parameters, "getParameters")
//   .mockImplementation(() => {});
jest.mock("../paramArgv");
jest.mock("stream");
describe("Проверка приложения в целом", () => {
  test("should ", async () => {
    paramArgv.mockReturnValue(["-c", "C1-A1"]);

    expect().toThrow(`File ${pathFileNotWritable} is not wtitable`);

    // expect(typeof array).toEqual("object");
    // expect(array.length).toEqual(3);

    //const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {});
    //const mockExit = jest.spyOn(parameters, "getParameters").mockImplementation(() => {});

    // const cp = spawn("node", ["../index.js", "-c", "C1", "-i", "./input.txt"]);

    // let res = "";

    // await cp.stdout.on("data", (chunk) => {
    //   console.log(chunk.toString());
    //   res += chunk.toString();
    // });

    // await cp.stdout.on("end", () => {
    //   // This is to remove LF
    //   res = res.trim();
    //   expect(res).toBe("Uijt jt tfdsfu. Nfttbhf bcpvu '_' tzncpm!");
    // });
  });
});
