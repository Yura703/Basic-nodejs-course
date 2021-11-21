const { expect } = require("@jest/globals");
const { spawn } = require("child_process");
const index = require("../index");
const parameters = require("../src/validateParameters");

const mockExit = jest.spyOn(parameters, "getParameters").mockImplementation(() => {});

describe("Проверка приложения в целом", () => {
  // const obj = {
  //     config: [
  //       'C1', 'R1', 'C0',
  //       'C0', 'A',  'R0',
  //       'R1', 'R1', 'A',
  //       'C1'
  //     ],
  //     input: './input.txt',
  //     output: './output.txt'
  //   };

  test("should ", () => {
    //const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {});
    const mockExit = jest.spyOn(parameters, "getParameters").mockImplementation(() => {});

    const cp = spawn("node", ["../index.js", "-c", "C1", "-i", "./input.txt"]);

    let res = "";

    cp.stdout.on("data", (chunk) => {
      console.log(chunk.toString());
      res += chunk.toString();
    });

    cp.stdout.on("end", () => {
      // This is to remove LF
      res = res.trim();
    });

    expect(res).toBe("Uijt jt tfdsfu. Nfttbhf bcpvu '_' tzncpm!");
  });
});
