export enum DoorStatus {
  Door,
  Wall,
  Unknown
}

export interface Room {
  north: DoorStatus;
  south: DoorStatus;
  west: DoorStatus;
  east: DoorStatus;
}

export const getNewRoom = (): Room => ({
  north: DoorStatus.Unknown,
  south: DoorStatus.Unknown,
  west: DoorStatus.Unknown,
  east: DoorStatus.Unknown
});

type X = number;
type Y = number;
interface Coordinates {
  x: X;
  y: Y;
}
type Direction = "N" | "S" | "E" | "W";

type RoomMap = Map<Y, Map<X, Room>>;

const createRoomMap = (path: string) => {
  const roomMap: RoomMap = new Map<Y, Map<X, Room>>();
  const pathArray = path.split("");
  let index = 1;
  let char = pathArray[index];
  let currentCoordinates: Coordinates = { x: 0, y: 0 };
  const crossRoads = [];

  while (char !== "$") {
    if (isDirection(char)) {
      setDoor(currentCoordinates, char as Direction, roomMap);
      const newCoordinates = getNextCoordinates(
        currentCoordinates,
        char as Direction
      );
      const oppositeDirection = getOppositeDirection(char as Direction);
      setDoor(newCoordinates, oppositeDirection, roomMap);
      currentCoordinates = newCoordinates;
    } else if (char === "(") {
      //
    } else if (char === "|") {
    } else if (char === ")") {
    }
    index = index + 1;
    char = pathArray[index];
  }
};

export const setDoor = (
  coordinates: Coordinates,
  direction: Direction,
  map: RoomMap
): void => {
  const y = map.get(coordinates.y);
  const x = y && y.get(coordinates.x);
  if (y) {
    y.set(coordinates.x, getRoomWithDoorSet(x || getNewRoom(), direction));
  } else {
    const room = getRoomWithDoorSet(getNewRoom(), direction);
    map.set(coordinates.y, new Map<X, Room>([[coordinates.x, room]]));
  }
};

export const getRoomWithDoorSet = (room: Room, direction: Direction): Room => ({
  ...room,
  north: direction === "N" ? DoorStatus.Door : room.north,
  south: direction === "S" ? DoorStatus.Door : room.south,
  west: direction === "W" ? DoorStatus.Door : room.west,
  east: direction === "E" ? DoorStatus.Door : room.east
});

const getOppositeDirection = (direction: Direction) => {
  switch (direction) {
    case "N":
      return "S";
    case "S":
      return "N";
    case "W":
      return "E";
    case "E":
      return "W";
  }
};

export const getNextCoordinates = (
  c: Coordinates,
  direction: Direction
): Coordinates => {
  switch (direction) {
    case "N":
      return { ...c, y: c.y - 1 };
    case "S":
      return { ...c, y: c.y + 1 };
    case "W":
      return { ...c, x: c.x - 1 };
    case "E":
      return { ...c, x: c.x + 1 };
  }
};

const isDirection = (char: string): boolean =>
  char === "N" || char === "S" || char === "W" || char === "E";
