import {
  addNumbersInArray,
  reduceWithStartingValue,
  addNumbersInLoop
} from "./day1";
import { frequencyChanges } from "./inputs/day1";

describe("addNumbersInArray", () => {
  test("It should add numbers in an array together", () => {
    const testArray = [+1, -2, +3, +1];
    expect(addNumbersInArray(testArray, 0)).toEqual(3);
  });

  test("It should add these numbers together too", () => {
    const testArray = [-1, -2, -3];
    expect(addNumbersInArray(testArray, 0)).toEqual(-6);
  });

  test("It should add these numbers, given a non-zero starting value", () => {
    const testArray = [-1, -2, -3];
    expect(addNumbersInArray(testArray, 7)).toEqual(1);
  });

  // console.log("The answer to part 1 day 1 is: ", addNumbersInArray(frequencyChanges, 0));
});

describe("addNumbersInLoop", () => {
  it("should throw at 10", () => {
    const testArray = [+3, +3, +4, -2, -4];
    expect(() => addNumbersInLoop(testArray)).toThrow("10");
  });

  it("should throw at 5", () => {
    const testArray = [-6, +3, +8, +5, -6];
    expect(() => addNumbersInLoop(testArray)).toThrow("5");
  });

  it("should throw at 14", () => {
    const testArray = [+7, +7, -2, -7, -4];
    expect(() => addNumbersInLoop(testArray)).toThrow("14");
  });

  // it("should spit out the correct answer in an exception", () => {
  //   expect(() => addNumbersInLoop(frequencyChanges)).toThrow("the answer");
  // });
});
