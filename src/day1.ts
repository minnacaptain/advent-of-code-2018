export const addNumbersInLoop = (numbers: number[]) => {
  let startingValue = 0;
  const existingValues = new Map<number, 0>();
  while (true) {
    startingValue = reduceWithStartingValue(
      numbers,
      startingValue,
      addAndThrowIfDuplicate(existingValues)
    );
  }
};

export const addAndThrowIfDuplicate = (existingValues: Map<number, 0>) => (
  acc: number,
  value: number
) => {
  const resultingValue = acc + value;
  if (existingValues.has(resultingValue)) {
    throw resultingValue;
  } else {
    existingValues.set(resultingValue, 0);
  }
  return resultingValue;
};

export const reduceWithStartingValue = (
  numbers: number[],
  startingValue: number,
  reducer: (acc: number, value: number) => number
) => numbers.reduce(reducer, startingValue);

export const addNumbersInArray = (numbers: number[], startingValue: number) =>
  reduceWithStartingValue(numbers, startingValue, simpleNumberAdder);

const simpleNumberAdder = (number1: number, number2: number) =>
  number1 + number2;
