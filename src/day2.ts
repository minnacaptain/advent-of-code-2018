export const getStringOccurrenceMap = (word: string) =>
  getMap(accumulateOccurrencesInMap)(word.split(""));

type MapIterator = (
  map: Map<string, number>
) => (str: string, index: number) => void;

export const getMap = (iterateUsingMap: MapIterator) => (strings: string[]) => {
  const map = new Map<string, number>();
  strings.forEach(iterateUsingMap(map));
  return map;
};

const accumulateOccurrencesInMap = (map: Map<string, number>) => (
  str: string
) => map.set(str, map.has(str) ? map.get(str)! + 1 : 1);

export const throwAtTwoOccurrences = (map: Map<string, number>) => (
  str: string,
  index: number
) => {
  if (map.has(str)) throw str;
  map.set(str, index);
};

export const hasNumberOfOccurrences = (occurrences: number) => (
  characterMap: Map<string, number>
) =>
  [...characterMap.values()].filter(value => value === occurrences).length > 0;

const getNumberOfOccurrencesInList = (occurrences: number) => (
  strings: string[]
) =>
  strings
    .map(word => getStringOccurrenceMap(word))
    .filter(charMap => hasNumberOfOccurrences(occurrences)(charMap)).length;

export const getCheckSum = (strings: string[]) =>
  getNumberOfOccurrencesInList(2)(strings) *
  getNumberOfOccurrencesInList(3)(strings);

export const getWordsWithCharacterRemovedAt = (column: number) => (
  strings: string[]
) => strings.map(word => word.slice(0, column) + word.slice(column + 1));

export const throwCommonLetters = (ids: string[]) => {
  ids[0].split("").forEach((_, index) => {
    const idsWithCharacterRemovedAt = getWordsWithCharacterRemovedAt(index)(
      ids
    );
    getMap(throwAtTwoOccurrences)(idsWithCharacterRemovedAt);
  });
};
