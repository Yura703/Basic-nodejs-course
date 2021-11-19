const { expect } = require("@jest/globals");
const {
  checkAvailabilityFile,
  canWrite,
  canRead,
  isFolder,
} = require("../../src/validate/validateFile");
const fs = require("fs");
//const { validateParameters } = require("../../validateParameters");

// mock,  который возвращается из вызовом jest.spyOn() тоже имеет метод .mockImplementation(),
//т.е. навесив шпиона на process.exit можно подменить его реализацию.
//Таким образом будет вызвана кастомная реализация вместо оригинальной функции.
// Только желательно не забыть перед завершение кейса очистить шпиона.

describe("Проверка файлов", () => {
  const pathFile = "../../input.txt"; //переделать под относительные имена и сдeлать \\ для OS
  const pathFileNotWritable = "../../output_notWrite";
  const pathFileNotReadtable = "../../output_notWrite.txt";
  const pathFolder = "../validate";

  // test("исключим на время ткстирования вызов process.exit", () => {
  //   //https://jestjs.io/docs/jest-object#jestspyonobject-methodname
  //   const spy = jest.spyOn(validateParameters, "exit(1)");
  //   const isExist = validateParameters.exit(1);

  //   expect(spy).toHaveBeenCalled();
  //   expect(isExist).toBe(true);

  //   //spy.mockRestore();
  // });
  test("File is not writable", () => {
    expect(() => canWrite(pathFileNotWritable)).toThrow(
      `File ${pathFileNotWritable} is not wtitable`
    );
  });

  test("File is writable", () => {
    expect(() => canWrite(pathFile)).not.toThrow(
      //---------------------------
      `File ${pathFile} is not wtitable`
    );
  });

  test("File is not readable", () => {
    expect(() => canRead(pathFileNotReadtable)).toThrow(
      `File ${pathFileNotReadtable} is not reading`
    );
  });

  test("File is readable", () => {
    expect(() => canRead(pathFile)).not.toThrow(
      //--------------------------------
      `File ${pathFile} is not reading`
    );
  });

  test("Path is folder", () => {
    //не работает передача файла. Он не открывается, нет доступа
    expect(() => isFolder("../../aa")).toThrow(`Path ${pathFolder} is folder`); //----------------------------
  });

  test("Path is not folder", () => {
    expect(() => isFolder(pathFile)).not.toThrow(`Path ${pathFile} is folder`);
  });

  const pathArray = ["-i", "--input", "-o", "--output"];
  //передать массив элементов
  test("check availability file", () => {
    expect(() => checkAvailabilityFile(pathArray[0])).toThrow(Error);
  });

  test("path file id undefined", () => {
    expect(() => checkAvailabilityFile(undefined)).toThrow(`Not exist file`);
  });
});
