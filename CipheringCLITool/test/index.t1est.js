const { expect } = require("@jest/globals");
const { spawn } = require("child_process");
const index = require("../index");

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
    const cp = spawn("node", ["../index.js", "-c", "C1", "-i", "./input.txt"]);

    let res = "";

    cp.stdout.on("data", (chunk) => {
      res += chunk.toString();
    });

    cp.stdout.on("end", () => {
      // This is to remove LF
      res = res.trim();
    });

    expect(res).toBe("Uijt jt tfdsfu. Nfttbhf bcpvu '_' tzncpm!");
  });
});
