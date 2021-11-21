const { expect } = require("@jest/globals");
const {
  checkAvailabilityFile,
  canWrite,
  canRead,
  isFolder,
} = require("../../src/validate/validateFile");
const fs = require("fs");

jest.mock("fs");

describe("Проверка файлов", () => {
  const pathFile = "../../input.txt";
  const pathFileNotWritable = "../../output_notWrite";
  const pathFileNotReadtable = "../../output_notWrite.txt";
  const pathFolder = "../validate";

  test("File is not writable", () => {
    fs.accessSync.mockImplementation(() => {
      throw new Error();
    });
    const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {});

    expect(() => canWrite(pathFileNotWritable)).toThrow(
      `File ${pathFileNotWritable} is not wtitable`
    );
  });

  test("File is writable", () => {
    fs.accessSync.mockImplementation(() => {});
    const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {});

    expect(() => canWrite(pathFile)).not.toThrow(
      `File ${pathFile} is not wtitable`
    );
  });

  test("File is not readable", () => {
    fs.accessSync.mockImplementation(() => {
      throw new Error();
    });
    const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {});

    expect(() => canRead(pathFileNotReadtable)).toThrow(
      `File ${pathFileNotReadtable} is not reading`
    );
  });

  test("File is readable", () => {
    fs.accessSync.mockImplementation(() => {});
    const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {});

    expect(() => canRead(pathFile)).not.toThrow(
      `File ${pathFile} is not reading`
    );
  });

  test("Path is folder", () => {
    fs.lstatSync.mockImplementation(() => {
      function isDirectory() {
        return true;
      }
    });
    const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {});

    expect(() => isFolder("../../aa")).toThrow(Error);
  });

  test("Path is not folder", () => {
    fs.accessSync.mockImplementation(() => {
      throw new Error();
    });
    const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {});

    expect(() => isFolder(pathFile)).not.toThrow(`Path ${pathFile} is folder`);
  });

  const pathArray = ["-i", "--input", "-o", "--output"];
  test("check availability file", () => {
    const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {});

    expect(() => checkAvailabilityFile(pathArray[0])).toThrow(Error);
  });

  test("path file id undefined", () => {
    const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {});

    expect(() => checkAvailabilityFile(undefined)).toThrow(`Not exist file`);
  });
});
