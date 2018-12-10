import {
  getNextPoint,
  getLargestValue,
  getSmallestValue,
  getVariance,
  getMinima,
  printAnswer
} from "./day10";
import { points } from "./inputs/day10";

export const examplePoints = [
  { position: { X: 9, Y: 1 }, velocity: { X: 0, Y: 2 } },
  { position: { X: 7, Y: 0 }, velocity: { X: -1, Y: 0 } },
  { position: { X: 3, Y: -2 }, velocity: { X: -1, Y: 1 } },
  { position: { X: 6, Y: 10 }, velocity: { X: -2, Y: -1 } },
  { position: { X: 2, Y: -4 }, velocity: { X: 2, Y: 2 } },
  { position: { X: -6, Y: 10 }, velocity: { X: 2, Y: -2 } },
  { position: { X: 1, Y: 8 }, velocity: { X: 1, Y: -1 } },
  { position: { X: 1, Y: 7 }, velocity: { X: 1, Y: 0 } },
  { position: { X: -3, Y: 11 }, velocity: { X: 1, Y: -2 } },
  { position: { X: 7, Y: 6 }, velocity: { X: -1, Y: -1 } },
  { position: { X: -2, Y: 3 }, velocity: { X: 1, Y: 0 } },
  { position: { X: -4, Y: 3 }, velocity: { X: 2, Y: 0 } },
  { position: { X: 10, Y: -3 }, velocity: { X: -1, Y: 1 } },
  { position: { X: 5, Y: 11 }, velocity: { X: 1, Y: -2 } },
  { position: { X: 4, Y: 7 }, velocity: { X: 0, Y: -1 } },
  { position: { X: 8, Y: -2 }, velocity: { X: 0, Y: 1 } },
  { position: { X: 15, Y: 0 }, velocity: { X: -2, Y: 0 } },
  { position: { X: 1, Y: 6 }, velocity: { X: 1, Y: 0 } },
  { position: { X: 8, Y: 9 }, velocity: { X: 0, Y: -1 } },
  { position: { X: 3, Y: 3 }, velocity: { X: -1, Y: 1 } },
  { position: { X: 0, Y: 5 }, velocity: { X: 0, Y: -1 } },
  { position: { X: -2, Y: 2 }, velocity: { X: 2, Y: 0 } },
  { position: { X: 5, Y: -2 }, velocity: { X: 1, Y: 2 } },
  { position: { X: 1, Y: 4 }, velocity: { X: 2, Y: 1 } },
  { position: { X: -2, Y: 7 }, velocity: { X: 2, Y: -2 } },
  { position: { X: 3, Y: 6 }, velocity: { X: -1, Y: -1 } },
  { position: { X: 5, Y: 0 }, velocity: { X: 1, Y: 0 } },
  { position: { X: -6, Y: 0 }, velocity: { X: 2, Y: 0 } },
  { position: { X: 5, Y: 9 }, velocity: { X: 1, Y: -2 } },
  { position: { X: 14, Y: 7 }, velocity: { X: -2, Y: 0 } },
  { position: { X: -3, Y: 6 }, velocity: { X: 2, Y: -1 } }
];

describe("getNextPoint", () => {
  it("gets the next point", () => {
    const point = { position: { X: 10, Y: 10 }, velocity: { X: 5, Y: -5 } };
    expect(getNextPoint(point)).toEqual({
      position: { X: 15, Y: 5 },
      velocity: { X: 5, Y: -5 }
    });
  });
});

describe("getLargestValue", () => {
  it("gets the largest value in an array", () => {
    const test = [10000, 5, -12023, 4, 0, 2323232, 7];
    expect(getLargestValue(test)).toEqual(2323232);
  });

  it("gets the largest value even if it's the first one", () => {
    const test = [10000, 5, -12023, 4, 0, 8];
    expect(getLargestValue(test)).toEqual(10000);
  });
});

describe("getSmallestValue", () => {
  it("gets the smallest value in an array", () => {
    const test = [10000, 5, -12023, 4, 0, 2323232, 7];
    expect(getSmallestValue(test)).toEqual(-12023);
  });

  it("gets the smallest value even if it's the last one", () => {
    const test = [10000, 5, -12023, 4, 0, -90000];
    expect(getSmallestValue(test)).toEqual(-90000);
  });
});

describe("getVariance", () => {
  it("gets the spread of points", () => {
    const test = [90, 78, 130, 2, 0, -70];
    expect(getVariance(test)).toEqual(200);
  });
});

describe("getMinima", () => {
  it("gets the point in time for part 1", () => {
    // expect(getMinima(points)).toEqual("the answer");
  });
});

describe("print", () => {
  it("prints the example answer in visual form", () => {
    // expect(printAnswer(getMinima(examplePoints))).toEqual("hum");
  });

  it("prints the answer in visual form", () => {
    // expect(printAnswer(getMinima(points))).toEqual("hum");
  });
});
