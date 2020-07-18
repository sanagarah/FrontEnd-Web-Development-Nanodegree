import { num } from "../src/client/js/t";
describe(num, () => {
  test("The date is valid", () => {
    expect(num(18, 7, 1998)).toBe(false);
  });
});
