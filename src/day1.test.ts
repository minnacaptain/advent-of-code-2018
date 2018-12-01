import { addNumbersInArray } from "./day1";
import { frequencyChanges } from "./inputs/day1";

describe("addNumbersInArray", () => {
  test("It should add numbers in an array together", () => {
    const testArray = [+1, -2, +3, +1];
    expect(addNumbersInArray(testArray)).toEqual(3);
  });

  test("It should add these numbers together too", () => {
    const testArray = [-1, -2, -3];
    expect(addNumbersInArray(testArray)).toEqual(-6);
  });

  console.log("The answer is: ", addNumbersInArray(frequencyChanges));
});
