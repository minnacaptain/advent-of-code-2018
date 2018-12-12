import {
  getPowerLevel,
  setRackId,
  doA,
  doB,
  doC,
  doD,
  doE,
  Unit,
  getPowerLevelGrid,
  getPowerLevelTotal,
  getFromGrid
} from "./day11";

const serialNumber = 8772;

const testUnitWithoutRackId: Unit = {
  x: 3,
  y: 5,
  rackId: 0,
  serialNumber: 8,
  powerLevel: 0
};

const testUnit = {
  ...testUnitWithoutRackId,
  rackId: 13
};

describe("setRackId", () => {
  it("sets the rack ID for the unit", () => {
    expect(setRackId(testUnitWithoutRackId).rackId).toEqual(13);
  });
});

describe("doA", () => {
  it("has the right power level after doA", () => {
    expect(doA({ ...testUnit, rackId: 13 }).powerLevel).toEqual(65);
  });
});

describe("doB", () => {
  it("has the right power level after doB", () => {
    expect(doB({ ...testUnit, powerLevel: 65 }).powerLevel).toEqual(73);
  });
});

describe("doC", () => {
  it("has the right power level after doC", () => {
    expect(doC({ ...testUnit, powerLevel: 73 }).powerLevel).toEqual(949);
  });
});

describe("doD", () => {
  it("has the right power level after doD", () => {
    expect(doD({ ...testUnit, powerLevel: 949 }).powerLevel).toEqual(9);
  });

  it("gets the hundreth of 123", () => {
    expect(doD({ ...testUnit, powerLevel: 123 }).powerLevel).toEqual(1);
  });

  it("gets the hundreth of 345678", () => {
    expect(doD({ ...testUnit, powerLevel: 345678 }).powerLevel).toEqual(6);
  });

  it("gets the hundreth of 9876", () => {
    expect(doD({ ...testUnit, powerLevel: 9876 }).powerLevel).toEqual(8);
  });
});

describe("doE", () => {
  it("has the right power level after doE", () => {
    expect(doE({ ...testUnit, powerLevel: 9 }).powerLevel).toEqual(4);
  });
});

describe("getPowerLevel", () => {
  it("should return the correct answer for example case 1", () => {
    const coordinate = { x: 3, y: 5 };
    const serialNumber = 8;
    expect(getPowerLevel(coordinate, serialNumber)).toEqual(4);
  });

  it("should return the correct answer for example case 2", () => {
    const coordinate = { x: 122, y: 79 };
    const serialNumber = 57;
    expect(getPowerLevel(coordinate, serialNumber)).toEqual(-5);
  });

  it("should return the correct answer for example case 3", () => {
    const coordinate = { x: 217, y: 196 };
    const serialNumber = 39;
    expect(getPowerLevel(coordinate, serialNumber)).toEqual(0);
  });

  it("should return the correct answer for example case 4", () => {
    const coordinate = { x: 101, y: 153 };
    const serialNumber = 71;
    expect(getPowerLevel(coordinate, serialNumber)).toEqual(4);
  });
});

describe("getPowerLevelGrid", () => {
  it("should get the right powerLevel total from the example", () => {
    const powerLevelGrid = getPowerLevelGrid(300, 18);

    expect(getFromGrid(powerLevelGrid)({ x: 33, y: 45 })).toEqual(4);
    expect(getFromGrid(powerLevelGrid)({ x: 34, y: 46 })).toEqual(3);
    expect(getFromGrid(powerLevelGrid)({ x: 35, y: 47 })).toEqual(4);
    expect(getFromGrid(powerLevelGrid)({ x: 33, y: 47 })).toEqual(1);
  });

  it("should get the right powerLevel total from the other example", () => {
    const powerLevelGrid = getPowerLevelGrid(300, 42);

    expect(getFromGrid(powerLevelGrid)({ x: 21, y: 61 })).toEqual(4);
    expect(getFromGrid(powerLevelGrid)({ x: 22, y: 61 })).toEqual(3);
    expect(getFromGrid(powerLevelGrid)({ x: 23, y: 62 })).toEqual(4);
    expect(getFromGrid(powerLevelGrid)({ x: 22, y: 63 })).toEqual(3);
  });
});

describe("getPowerLevelTotal", () => {
  it("should get the right powerLevel 3x3 total from the example", () => {
    const powerLevelGrid = getPowerLevelGrid(300, 18);
    expect(getPowerLevelTotal(powerLevelGrid, { x: 33, y: 45 })).toEqual(29);
  });

  it("should get the right powerLevel 3x3 total from the example", () => {
    const powerLevelGrid = getPowerLevelGrid(300, 42);
    expect(getPowerLevelTotal(powerLevelGrid, { x: 21, y: 61 })).toEqual(30);
  });
});
