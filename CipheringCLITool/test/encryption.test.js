const encryption = require("../encryption");

test("Name test", () => {
  expect(encryption("aaAA123", "Caesar", true)).toBe("bbBB123");
});
