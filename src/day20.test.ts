import {
  DoorStatus,
  getNextCoordinates,
  getNewRoom,
  getRoomWithDoorSet,
  Room,
  setDoor
} from "./day20";

const testInput1 = "^WNE$";
const testInput2 = "^ENWWW(NEEE|SSE(EE|N))$";
const testInput3 = "^ENNWSWW(NEWS|)SSSEEN(WNSE|)EE(SWEN|)NNN$";

describe("getNextCoordinates", () => {
  it("should get the next coordinate when direction is North", () => {
    const direction = "N";
    const coordinates = { x: 0, y: 0 };
    expect(getNextCoordinates(coordinates, direction)).toEqual({ x: 0, y: -1 });
  });

  it("should get the next coordinate when direction is South", () => {
    const direction = "S";
    const coordinates = { x: 1, y: 700 };
    expect(getNextCoordinates(coordinates, direction)).toEqual({
      x: 1,
      y: 701
    });
  });

  it("should get the next coordinate when direction is East", () => {
    const direction = "E";
    const coordinates = { x: -70, y: -90 };
    expect(getNextCoordinates(coordinates, direction)).toEqual({
      x: -69,
      y: -90
    });
  });

  it("should get the next coordinate when direction is West", () => {
    const direction = "W";
    const coordinates = { x: -5, y: -5 };
    expect(getNextCoordinates(coordinates, direction)).toEqual({
      x: -6,
      y: -5
    });
  });
});

describe("getRoomWithDoorSet", () => {
  it("should return a room that has the door set to north", () => {
    const initialRoom = getNewRoom();
    expect(getRoomWithDoorSet(initialRoom, "N")).toEqual({
      north: DoorStatus.Door,
      south: DoorStatus.Unknown,
      west: DoorStatus.Unknown,
      east: DoorStatus.Unknown
    });
  });

  it("should be able to override a wall", () => {
    const initialRoom = { ...getNewRoom(), south: DoorStatus.Wall };
    expect(getRoomWithDoorSet(initialRoom, "S")).toEqual({
      north: DoorStatus.Unknown,
      south: DoorStatus.Door,
      west: DoorStatus.Unknown,
      east: DoorStatus.Unknown
    });
  });
});

describe("setDoor", () => {
  it("should set a door if no y or x value exists on map", () => {
    const map = new Map<number, Map<number, Room>>();
    setDoor({ x: 0, y: 0 }, "S", map);
    expect(map.get(0)!.get(0)).toEqual({
      ...getNewRoom(),
      south: DoorStatus.Door
    });
    expect([...map.keys()].length).toEqual(1);
    expect([...map.get(0)!.keys()].length).toEqual(1);
  });

  it("should set a door if the y value exists but x doesn't", () => {
    const map = new Map<number, Map<number, Room>>([
      [9, new Map<number, Room>([[7, getNewRoom()]])]
    ]);
    setDoor({ x: 5, y: 9 }, "N", map);
    expect(map.get(9)!.get(5)).toEqual({
      ...getNewRoom(),
      north: DoorStatus.Door
    });
    expect([...map.keys()].length).toEqual(1);
    expect([...map.get(9)!.keys()].length).toEqual(2);
  });

  it("should set a room door value if the room already exists in the map", () => {
    const map = new Map<number, Map<number, Room>>([
      [98, new Map<number, Room>([[-145, getNewRoom()]])]
    ]);
    setDoor({ x: -145, y: 98 }, "N", map);
    expect(map.get(98)!.get(-145)).toEqual({
      ...getNewRoom(),
      north: DoorStatus.Door
    });
    expect([...map.keys()].length).toEqual(1);
    expect([...map.get(98)!.keys()].length).toEqual(1);
  });
});
