export const shouldReact = (a: string, b: string): boolean =>
  a !== b && a.toLowerCase() === b.toLowerCase();

export const getNextComparableIndex = (
  startingIndex: number,
  garbage: boolean[]
): number => garbage.indexOf(true, startingIndex + 1);

export const getPolymerStringArray = (polymer: string): string[] =>
  polymer.split("");

export const getFirstDeletionPair = (
  charArr: string[]
): [number, number] | null => {
  let index = 0;
  while (index < charArr.length - 1) {
    const nextIndex = index + 1;
    if (shouldReact(charArr[index], charArr[nextIndex])) {
      return [index, nextIndex];
    }
    index = nextIndex;
  }
  return null;
};

export const removeFromArrayAtIndices = (
  strArray: string[],
  indices: [number, number]
): string[] => {
  strArray.splice(indices[0], 2);
  return strArray;
};

export const getFinalString = (polymerString: string): string => {
  let reducingInSize = true;
  let polymerArray = getPolymerStringArray(polymerString);
  while (reducingInSize) {
    const indicesToDelete = getFirstDeletionPair(polymerArray);
    if (indicesToDelete !== null) {
      polymerArray = removeFromArrayAtIndices(polymerArray, indicesToDelete);
      continue;
    }
    reducingInSize = false;
  }
  return polymerArray.join("");
};

// const getDistinctElementToRemove = () => just a simple reduce

// const forEach, remove from the original string -> again, a simple reduce
