const { pipeline } = require("stream");
const arrayStreams = require("./src/toArrayStreams");

pipeline(arrayStreams, (err) => {
  if (err) {
    console.error("Pipeline failed.", err);
  } else {
    console.log("Pipeline succeeded.");
  }
});
