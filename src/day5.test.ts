import {
  shouldReact,
  getNextComparableIndex,
  getPolymerStringArray,
  getFinalString,
  removeFromArrayAtIndices,
  getFirstDeletionPair
} from "./day5";
import { polymer } from "./inputs/day5";

const exampleString0 = "dabAcCaCBAcCcaDA";
const exampleString1 = "dabAaCBAcCcaDA";
const exampleString2 = "dabCBAcCcaDA";
const exampleString3 = "dabCBAcaDA";

describe("shouldReact", () => {
  test("two elements of different case but same character should react", () => {
    expect(shouldReact("a", "A")).toEqual(true);
  });

  test("two elements of different case but same character should react, other way", () => {
    expect(shouldReact("A", "a")).toEqual(true);
  });

  test("two elements, same upper case should not react", () => {
    expect(shouldReact("A", "A")).toEqual(false);
  });

  test("two elements, same lower case should not react", () => {
    expect(shouldReact("a", "a")).toEqual(false);
  });

  test("two elements, different elements should not react", () => {
    expect(shouldReact("x", "1")).toEqual(false);
  });
});

describe("getNextComparableIndex", () => {
  const garbageArray = [true, false, false, true, true, true, false, true]; // length = 8

  test("should find the next comparable index when starting index value is true", () => {
    expect(getNextComparableIndex(3, garbageArray)).toEqual(4);
  });

  test("should find the next comparable index when starting index value is false", () => {
    expect(getNextComparableIndex(1, garbageArray)).toEqual(3);
  });

  test("should handle startingIndex 0", () => {
    expect(getNextComparableIndex(0, garbageArray)).toEqual(3);
  });

  test("should handle startingIndex === arrayLength -1", () => {
    expect(getNextComparableIndex(7, garbageArray)).toEqual(-1);
  });

  test("should handle startingIndex === arrayLength", () => {
    expect(getNextComparableIndex(8, garbageArray)).toEqual(-1);
  });
});

describe("getPolymerStringArray", () => {
  it("should split a string into a char array", () => {
    expect(getPolymerStringArray("hello")).toEqual(["h", "e", "l", "l", "o"]);
  });
});

describe("getFirstDeletionPair", () => {
  it("should get the first deletion pair", () => {
    expect(getFirstDeletionPair(exampleString0.split(""))).toEqual([4, 5]);
  });

  it("should get the second deletion pair", () => {
    expect(getFirstDeletionPair(exampleString1.split(""))).toEqual([3, 4]);
  });

  it("should get the second deletion pair", () => {
    expect(getFirstDeletionPair(exampleString2.split(""))).toEqual([6, 7]);
  });
});

describe("removeFromArrayAtIndices", () => {
  it("should remove at the right indices", () => {
    expect(
      removeFromArrayAtIndices(exampleString0.split(""), [4, 5]).join("")
    ).toEqual(exampleString1);
  });

  it("should remove at the right indices", () => {
    expect(
      removeFromArrayAtIndices(exampleString2.split(""), [6, 7]).join("")
    ).toEqual(exampleString3);
  });
});

describe("getFinalString", () => {
  test("gets the final string from the example data", () => {
    expect(getFinalString(exampleString0)).toEqual(exampleString3);
  });

  // test("gets the example string from the real data", () => {
  //   expect(getFinalString(polymer).length).toEqual("the answer");
  // });
});
