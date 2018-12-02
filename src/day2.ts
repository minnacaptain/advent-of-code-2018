export const getCharacterOccurrenceMap = (word: string) => {
  const characterMap = new Map<string, number>();
  word.split("").forEach((char: string) => {
    characterMap.set(
      char,
      characterMap.has(char) ? characterMap.get(char)! + 1 : 1
    );
  });
  return characterMap;
};

export const hasNumberOfOccurrences = (occurrences: number) => (
  characterMap: Map<string, number>
) =>
  [...characterMap.values()].filter(value => value === occurrences).length > 0;

const getNumberOfOccurrencesInList = (occurrences: number) => (
  words: string[]
) =>
  words
    .map(word => getCharacterOccurrenceMap(word))
    .filter(charMap => hasNumberOfOccurrences(occurrences)(charMap)).length;

export const getCheckSum = (words: string[]) =>
  getNumberOfOccurrencesInList(2)(words) *
  getNumberOfOccurrencesInList(3)(words);
