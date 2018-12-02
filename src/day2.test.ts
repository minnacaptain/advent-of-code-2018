import {
  getStringOccurrenceMap,
  hasNumberOfOccurrences,
  getCheckSum,
  getWordsWithCharacterRemovedAt,
  throwCommonLetters,
  throwAtTwoOccurrences,
  getMap
} from "./day2";
import { ids } from "./inputs/day2";

const abcdef = "abcdef";
const abcdefMap = new Map<string, number>([
  ["a", 1],
  ["b", 1],
  ["c", 1],
  ["d", 1],
  ["e", 1],
  ["f", 1]
]);

const aabcdd = "aabcdd";
const aabcddMap = new Map<string, number>([
  ["a", 2],
  ["b", 1],
  ["c", 1],
  ["d", 2]
]);

const ababab = "ababab";
const abcdee = "abcdee";

describe("getStringOccurrenceMap", () => {
  it("should count the number of occurrences of characters in a string", () => {
    expect(getStringOccurrenceMap(abcdef)).toEqual(abcdefMap);
  });

  it("should count the number of occurrences of characters in this other string too", () => {
    expect(getStringOccurrenceMap(aabcdd)).toEqual(aabcddMap);
  });
});

describe("hasNumberOfOccurrences", () => {
  it("should find that in string 'abcdef' there are no two-or three- occurrences", () => {
    const abcdefCharMap = getStringOccurrenceMap(abcdef);
    expect(hasNumberOfOccurrences(2)(abcdefCharMap)).toEqual(false);
    expect(hasNumberOfOccurrences(3)(abcdefCharMap)).toEqual(false);
  });

  it("should find that in string 'abcdee' there are two occurrences, no three occurrences", () => {
    const abcdeeCharMap = getStringOccurrenceMap(abcdee);
    expect(hasNumberOfOccurrences(2)(abcdeeCharMap)).toEqual(true);
    expect(hasNumberOfOccurrences(3)(abcdeeCharMap)).toEqual(false);
  });

  it("should find that in string 'ababab' there are three occurrences, but no two occurrences", () => {
    const abababCharMap = getStringOccurrenceMap(ababab);
    expect(hasNumberOfOccurrences(2)(abababCharMap)).toEqual(false);
    expect(hasNumberOfOccurrences(3)(abababCharMap)).toEqual(true);
  });
});

const testInput = [
  "abcdef",
  "bababc",
  "abbcde",
  "abcccd",
  "aabcdd",
  "abcdee",
  "ababab"
];

describe("getCheckSum", () => {
  it("should get the checksum correctly for the example data", () => {
    expect(getCheckSum(testInput)).toEqual(12);
  });

  // it("should get the checksum correctly for part 1", () => {
  //   expect(getCheckSum(ids)).toEqual(0); // the answer
  // });
});

describe("getWordsWithCharacterRemovedAt", () => {
  it("should remove all characters at 5", () => {
    expect(
      getWordsWithCharacterRemovedAt(5)(["hello world", "testingWorld"])
    ).toEqual(["helloworld", "testigWorld"]);
  });

  it("should remove all characters at 0", () => {
    expect(
      getWordsWithCharacterRemovedAt(0)(["hello world", "testingWorld"])
    ).toEqual(["ello world", "estingWorld"]);
  });
});

describe("throwAtTwoOccurrences", () => {
  it("should throw if there are two occurrences of the same thing in a list", () => {
    expect(() =>
      getMap(throwAtTwoOccurrences)(["myTest", "otherTest", "myTest"])
    ).toThrow("myTest");
  });
});

const exampleStrings = [
  "abcde",
  "fghij",
  "klmno",
  "pqrst",
  "fguij",
  "axcye",
  "wvxyz"
];

describe("throwCommonLetters", () => {
  it("should throw fghij", () => {
    expect(() => throwCommonLetters(exampleStrings)).toThrow("fgij");
  });

  // it("should throw the answer to part 2", () => {
  //   expect(() => throwCommonLetters(ids)).toThrow("the answer");
  // });
});
