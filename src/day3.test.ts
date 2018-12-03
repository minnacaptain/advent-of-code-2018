import {
  getOverlapCoordinateAmount,
  getOverlappingDepthCoordinates,
  SheetInputMap
} from "./day3";
import { sheets } from "./inputs/day3";

const exampleSheets: SheetInputMap = {
  1: { x: 1, y: 3, width: 4, height: 4 },
  2: { x: 3, y: 1, width: 4, height: 4 },
  3: { x: 5, y: 5, width: 2, height: 2 }
};

const expectedExampleOverlapMap = new Map<string, number>([
  ["3:3", 2],
  ["4:3", 2],
  ["3:4", 2],
  ["4:4", 2]
]);

describe("getCoordinateDepthMap", () => {
  it("should get the coordinate depth map correctly for example data", () => {
    expect(getOverlappingDepthCoordinates(exampleSheets)).toEqual(
      expectedExampleOverlapMap
    );
  });
});

describe("getOverlapCoordinateAmount", () => {
  it("should get the number of overlapping coordinates", () => {
    expect(getOverlapCoordinateAmount(exampleSheets)).toEqual(4);
  });

  // it("should get the solution to part 1", () => {
  //   expect(getOverlapCoordinateAmount(sheets)).toEqual(0); // the answer
  // });
});
