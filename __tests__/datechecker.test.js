import { dateChecker } from "../src/client/js/datechecker";
const mockDate = "03-03-1222";

describe("check if the date is not in the past", () => {
  test("should return false for an old date", () => {
    expect(dateChecker(mockDate)).toBe(false);
  });
});
