export type SheetInputMap = Record<number, SheetInput>;

interface SheetInput {
  x: number;
  y: number;
  width: number;
  height: number;
}

const getNaiveStringIndex = (x: number, y: number): string =>
  `${String(x)}:${String(y)}`;

export const getCoordinateDepthMap = (
  sheets: SheetInputMap
): Map<string, number> => {
  const coordinateMap = new Map<string, number>();
  Object.entries(sheets).forEach(([_, sheet]) => {
    [...Array(sheet.height)].forEach((_, yIndex) => {
      [...Array(sheet.width)].forEach((_, xIndex) => {
        const index = getNaiveStringIndex(sheet.x + xIndex, sheet.y + yIndex);
        coordinateMap.set(
          index,
          coordinateMap.has(index) ? coordinateMap.get(index)! + 1 : 1
        );
      });
    });
  });
  return coordinateMap;
};

export const getOverlappingDepthCoordinates = (
  sheets: SheetInputMap
): Map<string, number> =>
  new Map(
    [...getCoordinateDepthMap(sheets).entries()].filter(
      ([_, value]) => value > 1
    )
  );

export const getOverlapCoordinateAmount = (sheets: SheetInputMap): number =>
  getOverlappingDepthCoordinates(sheets).size;
