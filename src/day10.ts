interface Point {
  position: Coordinate;
  velocity: Coordinate;
}

interface Coordinate {
  X: number;
  Y: number;
}

export const getNextPoint = (point: Point): Point => ({
  position: {
    X: point.position.X + point.velocity.X,
    Y: point.position.Y + point.velocity.Y
  },
  velocity: point.velocity
});

interface PointInTime extends Coordinate {
  counter: number;
  points: Point[];
}

export const getMinima = (points: Point[]): PointInTime => {
  let pointz = points;
  let pointzSize: Coordinate = getSize(pointz);
  let counter = 0;
  while (true) {
    const newPoints = pointz.map(point => getNextPoint(point));
    const newPointsSize = getSize(newPoints);
    if (isGrowing(newPointsSize, pointzSize)) {
      return {
        counter,
        X: newPointsSize.X,
        Y: newPointsSize.Y,
        points: pointz
      };
    }
    pointz = newPoints;
    pointzSize = newPointsSize;
    counter = counter + 1;
  }
};

export const isGrowing = (newSize: Coordinate, oldSize: Coordinate): boolean =>
  newSize.X > oldSize.X || newSize.Y > oldSize.Y;

export const getSize = (points: Point[]): Coordinate => ({
  X: getVariance(points.map(point => point.position.X)),
  Y: getVariance(points.map(point => point.position.Y))
});

export const getVariance = (numbers: number[]) =>
  getLargestValue(numbers) - getSmallestValue(numbers);

export const getLargestValue = (numbers: number[]) =>
  numbers.reduce((curr, acc) => (curr > acc ? curr : acc));

export const getSmallestValue = (numbers: number[]) =>
  numbers.reduce((curr, acc) => (curr < acc ? curr : acc));

export const printAnswer = (pointInTime: PointInTime) => {
  console.log(
    [...getVisiMap(pointInTime).values()].reduce(
      (acc, arr) => `${acc} ${arr.toString()} \n`,
      ""
    )
  );
  console.log(pointInTime.counter);
};

export const getVisiMap = (pointInTime: PointInTime): Map<number, string[]> => {
  const vizMap = new Map<number, string[]>();
  [...Array(pointInTime.Y)].forEach(
    (_, index: number) => vizMap.set(index, Array(pointInTime.X).fill(".")),
    vizMap
  );
  const smallestX = getSmallestValue(pointInTime.points.map(p => p.position.X));
  const smallestY = getSmallestValue(pointInTime.points.map(p => p.position.Y));
  pointInTime.points.forEach(point => {
    const arr = vizMap.get(point.position.Y - smallestY);
    if (arr) {
      arr[point.position.X - smallestX] = "#";
    }
  });
  return vizMap;
};
