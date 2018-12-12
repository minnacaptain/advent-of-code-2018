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
): number => grid[coordinate.y - 1][coordinate.x - 1];

// OMG the worst
export const getPowerLevelTotal = (
  powerLevelGrid: number[][],
  topLeftCoordinate: Coordinate
): number =>
  getFromGrid(powerLevelGrid)(topLeftCoordinate) +
  getFromGrid(powerLevelGrid)({
    ...topLeftCoordinate,
    y: topLeftCoordinate.y + 1
  }) +
  getFromGrid(powerLevelGrid)({
    ...topLeftCoordinate,
    y: topLeftCoordinate.y + 2
  }) +
  getFromGrid(powerLevelGrid)({
    ...topLeftCoordinate,
    x: topLeftCoordinate.x + 1
  }) +
  getFromGrid(powerLevelGrid)({
    x: topLeftCoordinate.x + 1,
    y: topLeftCoordinate.y + 1
  }) +
  getFromGrid(powerLevelGrid)({
    x: topLeftCoordinate.x + 1,
    y: topLeftCoordinate.y + 2
  }) +
  getFromGrid(powerLevelGrid)({
    ...topLeftCoordinate,
    x: topLeftCoordinate.x + 2
  }) +
  getFromGrid(powerLevelGrid)({
    x: topLeftCoordinate.x + 2,
    y: topLeftCoordinate.y + 1
  }) +
  getFromGrid(powerLevelGrid)({
    x: topLeftCoordinate.x + 2,
    y: topLeftCoordinate.y + 2
  });
