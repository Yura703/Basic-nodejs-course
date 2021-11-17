const { getParameters } = require("../validateParameters");
// const sum = require("../tetst");

// test("Name test", () => {
//   expect(sum(1, 3)).toBe(4);
// });

const parameters = ["-c", "AA"];
test("compiling android goes as expected", () => {
  expect(() => getParameters()).toThrow();
  expect(() => getParameters()).toThrow(Error);

  // You can also use the exact error message or a regexp
  expect(() => getParameters()).toThrow("you are using the wrong JDK");
  expect(() => getParameters()).toThrow(/JDK/);
});
