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
  getFromGrid,
  getPowerLevelTotalGrid,
  getLargestPowerTotal
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

const exampleGrid1 = getPowerLevelGrid(300, 18);
const exampleGrid2 = getPowerLevelGrid(300, 42);

describe("getPowerLevelGrid", () => {
  it("should get the right powerLevel total from the example", () => {
    expect(getFromGrid(exampleGrid1)({ x: 33, y: 45 })).toEqual(4);
    expect(getFromGrid(exampleGrid1)({ x: 34, y: 46 })).toEqual(3);
    expect(getFromGrid(exampleGrid1)({ x: 35, y: 47 })).toEqual(4);
    expect(getFromGrid(exampleGrid1)({ x: 33, y: 47 })).toEqual(1);
  });

  it("should get the right powerLevel total from the other example", () => {
    expect(getFromGrid(exampleGrid2)({ x: 21, y: 61 })).toEqual(4);
    expect(getFromGrid(exampleGrid2)({ x: 22, y: 61 })).toEqual(3);
    expect(getFromGrid(exampleGrid2)({ x: 23, y: 62 })).toEqual(4);
    expect(getFromGrid(exampleGrid2)({ x: 22, y: 63 })).toEqual(3);
  });
});

describe("getPowerLevelTotal", () => {
  it("should get the right powerLevel 3x3 total from the example", () => {
    expect(getPowerLevelTotal(exampleGrid1, 3, { x: 33, y: 45 })).toEqual(29);
  });

  it("should get the right powerLevel 3x3 total from the example", () => {
    expect(getPowerLevelTotal(exampleGrid2, 3, { x: 21, y: 61 })).toEqual(30);
  });
});

describe("getFromGrid", () => {
  const myGrid = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
  it("should get proper numbers from the grid", () => {
    expect(getFromGrid(myGrid)({ x: 1, y: 1 })).toEqual(1);
    expect(getFromGrid(myGrid)({ x: 2, y: 2 })).toEqual(5);
    expect(getFromGrid(myGrid)({ x: 3, y: 3 })).toEqual(9);
  });

  it("should get 0 if index too large", () => {
    expect(getFromGrid(myGrid)({ x: 4, y: 2 })).toEqual(0);
    expect(getFromGrid(myGrid)({ x: 2, y: 9 })).toEqual(0);
    expect(getFromGrid(myGrid)({ x: 5, y: 5 })).toEqual(0);
  });

  it("should get 0 if index too small", () => {
    expect(getFromGrid(myGrid)({ x: -3, y: 2 })).toEqual(0);
    expect(getFromGrid(myGrid)({ x: 2, y: 0 })).toEqual(0);
    expect(getFromGrid(myGrid)({ x: 0, y: 0 })).toEqual(0);
  });
});

describe("getPowerLevelTotalGrid", () => {
  it("should get the right total for the first example", () => {
    expect(
      getFromGrid(getPowerLevelTotalGrid(exampleGrid1, 3))({
        x: 33,
        y: 45
      })
    ).toEqual(29);
  });

  it("should get the right total for the second example", () => {
    expect(
      getFromGrid(getPowerLevelTotalGrid(exampleGrid2, 3))({
        x: 21,
        y: 61
      })
    ).toEqual(30);
  });
});

describe("getLargestPowerTotal", () => {
  it("should get the example 1 largest total", () => {
    expect(getLargestPowerTotal(18, 300, 3)).toEqual(["32:44:3", 29]);
  });

  // it("should get the input largest total", () => {
  //   expect(getLargestPowerTotal(8772, 300, 3)).toEqual([""]); // yeah yeah I know
  // });
});
