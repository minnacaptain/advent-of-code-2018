import {
  addNumbersInArray,
  reduceWithStartingValue,
  adderThatThrowsException
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

  // console.log("The answer is: ", addNumbersInArray(frequencyChanges, 0));
});

describe("exceptionThrowingReducer", () => {
  test("It throws an exception if you use it", () => {
    const testArray = [2, 3, -6, 7];
    expect(() =>
      reduceWithStartingValue(testArray, 0, adderThatThrowsException(5))
    ).toThrow();
  });
});
