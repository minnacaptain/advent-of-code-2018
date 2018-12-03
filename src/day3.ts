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
): Map<string, number[]> => {
  const coordinateMap = new Map<string, number[]>();
  Object.entries(sheets).forEach(([claimId, sheet]) => {
    [...Array(sheet.height)].forEach((_, yIndex) => {
      [...Array(sheet.width)].forEach((_, xIndex) => {
        const index = getNaiveStringIndex(sheet.x + xIndex, sheet.y + yIndex);
        coordinateMap.set(
          index,
          coordinateMap.has(index)
            ? [...coordinateMap.get(index)!, Number(claimId)]
            : [Number(claimId)]
        );
      });
    });
  });
  return coordinateMap;
};

export const getOverlappingDepthCoordinates = (
  sheets: SheetInputMap
): Map<string, number[]> =>
  new Map<string, number[]>(
    [...getCoordinateDepthMap(sheets).entries()].filter(
      ([_, value]) => value.length > 1
    )
  );

export const getOverlapCoordinateAmount = (sheets: SheetInputMap): number =>
  getOverlappingDepthCoordinates(sheets).size;

export const getMaxClaimOverlapsMap = (
  sheets: SheetInputMap
): Map<number, number> => {
  const maxClaimOverlapsMap = new Map<number, number>();
  [...getCoordinateDepthMap(sheets).values()].forEach((owners: number[]) => {
    owners.forEach((owner: number) =>
      maxClaimOverlapsMap.set(
        owner,
        maxClaimOverlapsMap.get(owner)! > owners.length
          ? maxClaimOverlapsMap.get(owner)!
          : owners.length
      )
    );
  });
  return maxClaimOverlapsMap;
};

export const getOwnershipLengthOne = (
  sheets: SheetInputMap
): Record<number, number> =>
  [...getMaxClaimOverlapsMap(sheets).entries()].filter(
    ([_, value]) => value === 1
  )[0];
