const fs = require("fs");
const FileError = require("../errors/FileError");

function checkAvailabilityFile(pathFile) {
  if (
    pathFile === "-i" ||
    pathFile === "--input" ||
    pathFile === "-o" ||
    pathFile === "--output" ||
    pathFile === undefined ||
    !fs.existsSync(pathFile)
  ) {
    throw new FileError(`Not exist file ${pathFile ? pathFile : ""}`);
  }
}

function canWrite(pathFile) {
  try {
    fs.accessSync(pathFile, fs.constants.W_OK);
  } catch (error) {
    throw new FileError(`File ${pathFile} is not wtitable`);
  }
}

function canRead(pathFile) {
  try {
    fs.accessSync(pathFile, fs.constants.R_OK);
  } catch (error) {
    throw new FileError(`File ${pathFile} is not reading`);
  }
}

function isFolder(pathFile) {
  const is_folder = fs.lstatSync(pathFile).isDirectory();

  if (is_folder) {
    throw new FileError(`Path ${pathFile} is folder`);
  }
}

module.exports = {
  checkAvailabilityFile,
  canWrite,
  canRead,
  isFolder,
};
