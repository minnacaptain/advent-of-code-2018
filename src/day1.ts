export const adderThatThrowsException = (throwAt: number) => (
  acc: number,
  value: number
) => {
  const resultingValue = acc + value;
  if (resultingValue === throwAt) {
    throw resultingValue;
  }
  return resultingValue;
};

export const reduceWithStartingValue = (
  numbers: number[],
  startingValue: number,
  reducer: (acc: number, value: number) => number
) => startingValue + numbers.reduce(reducer);

export const addNumbersInArray = (numbers: number[], startingValue: number) =>
  reduceWithStartingValue(numbers, startingValue, simpleNumberAdder);

const simpleNumberAdder = (number1: number, number2: number) =>
  number1 + number2;
