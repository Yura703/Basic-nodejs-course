const { pipeline } = require("stream");
const arrayStreams = require("./src/toArrayStreams");
const parameters = require("./src/validateParameters");
const paramArgv = require("./paramArgv");

const param = paramArgv;
const array = arrayStreams(parameters(param));

pipeline(array, (err) => {
  if (err) {
    console.error("Pipeline failed.", err);
  } else {
    console.log("Pipeline succeeded.");
  }
});
