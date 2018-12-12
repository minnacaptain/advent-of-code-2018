import { getCheckSum } from "./day2";
import { getCoordinateDepthMap } from "./day3";

const iterator = (size: number) => [...Array(size)];

interface Coordinate {
  x: number;
  y: number;
}

export interface Unit extends Coordinate {
  powerLevel: number;
  serialNumber: number;
  rackId: number;
}

export const getPowerLevel = (
  coordinate: Coordinate,
  serialNumber: number
): number =>
  doE(
    doD(
      doC(
        doB(
          doA(
            setRackId({
              ...coordinate,
              serialNumber,
              powerLevel: 0,
              rackId: 0
            })
          )
        )
      )
    )
  ).powerLevel;

export const setRackId = (unit: Unit): Unit => ({
  ...unit,
  rackId: unit.x + 10
});

export const doA = (unit: Unit): Unit => ({
  ...unit,
  powerLevel: unit.rackId * unit.y
});

export const doB = (unit: Unit): Unit => ({
  ...unit,
  powerLevel: unit.powerLevel + unit.serialNumber
});

export const doC = (unit: Unit): Unit => ({
  ...unit,
  powerLevel: unit.powerLevel * unit.rackId
});

export const doD = (unit: Unit): Unit => ({
  ...unit,
  powerLevel: Number(unit.powerLevel.toString().slice(-3, -2))
});

export const doE = (unit: Unit): Unit => ({
  ...unit,
  powerLevel: unit.powerLevel - 5
});

export const makeRow = (
  size: number,
  y: number,
  serialNumber: number
): number[] =>
  iterator(size).map((_, x: number) =>
    getPowerLevel({ x: x + 1, y: y + 1 }, serialNumber)
  );

export const getPowerLevelGrid = (
  gridSize: number,
  serialNumber: number
): number[][] =>
  iterator(gridSize).map((_, y: number) => makeRow(gridSize, y, serialNumber));

export const getFromGrid = (grid: number[][]) => (
  coordinate: Coordinate
): number =>
  coordinate.x > grid.length ||
  coordinate.y > grid.length ||
  coordinate.x < 1 ||
  coordinate.y < 1
    ? 0
    : grid[coordinate.y - 1][coordinate.x - 1];

// Plz... refactor to use reduce
export const getPowerLevelTotal = (
  powerLevelGrid: number[][],
  observableSize: number,
  topLeftCoordinate: Coordinate
): number => {
  let total = 0;
  let x = topLeftCoordinate.x;
  let y = topLeftCoordinate.y;
  while (x < topLeftCoordinate.x + observableSize) {
    while (y < topLeftCoordinate.y + observableSize) {
      total = total + getFromGrid(powerLevelGrid)({ x, y });
      y = y + 1;
    }
    y = topLeftCoordinate.y;
    x = x + 1;
  }
  return total;
};

export const getPowerLevelTotalGrid = (
  powerLevelGrid: number[][],
  observableSize: number
) =>
  powerLevelGrid.map((row: number[], y: number) =>
    row.map((_: number, x: number) =>
      getPowerLevelTotal(powerLevelGrid, observableSize, { x: x + 1, y: y + 1 })
    )
  );

const getNaiveStringIndex = (coordinate: Coordinate, observableSize: number) =>
  `${coordinate.x}:${coordinate.y}:${observableSize}`;

// plz refactor this too
const getPowerLevelTotalMap = (
  serialNumber: number,
  gridSize: number,
  observableSize: number
): Map<string, number> => {
  const map = new Map<string, number>();
  getPowerLevelTotalGrid(
    getPowerLevelGrid(gridSize, serialNumber),
    observableSize
  ).forEach((row: number[], y: number) =>
    row.forEach((item: number, x: number) =>
      map.set(getNaiveStringIndex({ x, y }, observableSize), item)
    )
  );
  return map;
};

export const getLargestPowerTotal = (
  serialNumber: number,
  gridSize: number,
  observableSize: number
) =>
  [
    ...getPowerLevelTotalMap(serialNumber, gridSize, observableSize).entries()
  ].sort((a: [string, number], b: [string, number]) =>
    a[1] > b[1] ? -1 : 1
  )[0];

// const;
