export interface RawLogEntry {
  timeStamp: string;
  description: string;
}

export interface LogEntry {
  sortableTime: number;
  time: Time;
}

export enum LogEntryTypes {
  WAKES_UP = "WAKES_UP",
  FALLS_ASLEEP = "FALLS_ASLEEP",
  GUARD_CHANGED = "GUARD_CHANGED"
}

interface GuardChangedEntry extends LogEntry {
  type: LogEntryTypes.GUARD_CHANGED;
  guardNumber: number;
}

interface GuardWakesEntry extends LogEntry {
  type: LogEntryTypes.WAKES_UP;
}

interface GuardFallsAsleep extends LogEntry {
  type: LogEntryTypes.FALLS_ASLEEP;
}

type GuardAction = GuardChangedEntry | GuardWakesEntry | GuardFallsAsleep;

interface Time {
  month: number;
  day: number;
  hour: number;
  minute: number;
}

export const sortLogs = (logs: GuardAction[]): GuardAction[] =>
  logs.sort((a, b) => (a.sortableTime > b.sortableTime ? 1 : -1));

export const parseTimeString = (timeString: string): Time => ({
  month: Number(timeString.slice(5, 7)),
  day: Number(timeString.slice(8, 10)),
  hour: Number(timeString.slice(11, 13)),
  minute: Number(timeString.slice(14, 16))
});

export const getSortableTime = (timeString: string): number =>
  Number(
    timeString.slice(5, 7) +
      timeString.slice(8, 10) +
      timeString.slice(11, 13) +
      timeString.slice(14, 16)
  );

export const parseGuardNumber = (entryString: string): number => {
  const startIndex = entryString.indexOf("#") + 1;
  const endIndex = entryString.indexOf(" begins");
  return Number(entryString.substr(startIndex, endIndex - startIndex));
};

export const parseLogEntry = (
  descriptionString: string,
  timeStamp: string
): GuardAction => {
  const timeProps = {
    sortableTime: getSortableTime(timeStamp),
    time: parseTimeString(timeStamp)
  };
  switch (descriptionString.slice(0, 5)) {
    case "Guard":
      return {
        ...timeProps,
        type: LogEntryTypes.GUARD_CHANGED,
        guardNumber: parseGuardNumber(descriptionString)
      };
    case "falls":
      return {
        ...timeProps,
        type: LogEntryTypes.FALLS_ASLEEP
      };
    case "wakes":
      return {
        ...timeProps,
        type: LogEntryTypes.WAKES_UP
      };
    default:
      throw `Cannot parse description: '${descriptionString}'; timeStamp: '${timeStamp}'`;
  }
};

interface Shift {
  guard: number;
  minutesSlept: number[];
}

export const getShiftList = (sortedGuardActions: GuardAction[]): Shift[] => {
  const shifts: Shift[] = [];
  let guard: number = 0;
  let sleepStartTime: number = 0;
  let minutesSlept: number[] = [];

  sortedGuardActions.forEach(guardAction => {
    switch (guardAction.type) {
      case LogEntryTypes.GUARD_CHANGED:
        shifts.push({ guard, minutesSlept });
        minutesSlept = [];
        guard = guardAction.guardNumber;
      case LogEntryTypes.FALLS_ASLEEP:
        sleepStartTime = guardAction.time.minute;
      case LogEntryTypes.WAKES_UP: {
        const totalSleptMinutes = guardAction.time.minute - sleepStartTime;
        [...Array(totalSleptMinutes)].forEach((_, index) => {
          minutesSlept.push(sleepStartTime + index);
        });
      }
    }
  });

  shifts.push({ guard, minutesSlept });
  // Delete first entry cause we pushed an empty map
  shifts.shift();
  return shifts;
};

export const getShiftsListFromRawData = (rawData: RawLogEntry[]): Shift[] =>
  getShiftList(
    sortLogs(
      rawData.map(rawEntry =>
        parseLogEntry(rawEntry.description, rawEntry.timeStamp)
      )
    )
  );

type Guard = number;
type MinuteIndex = number;
type MinuteCount = number;

// I should use reduce more.
const incrementMinutesSlept = (
  existingMap: Map<MinuteIndex, MinuteCount>,
  minutes: number[]
): Map<MinuteIndex, MinuteCount> =>
  minutes.reduce(
    (theExistingMap, minute) =>
      theExistingMap.set(
        minute,
        theExistingMap.has(minute) ? theExistingMap.get(minute)! + 1 : 1
      ),
    existingMap
  );

// I should definitely use reduce more.
export const getGuardMinuteMap = (
  rawData: RawLogEntry[]
): Map<Guard, Map<MinuteIndex, MinuteCount>> =>
  getShiftsListFromRawData(rawData).reduce(
    (map: Map<Guard, Map<MinuteIndex, MinuteCount>>, shift: Shift) => {
      !map.has(shift.guard) &&
        map.set(shift.guard, new Map<MinuteIndex, MinuteCount>());
      return map.set(
        shift.guard,
        incrementMinutesSlept(map.get(shift.guard)!, shift.minutesSlept)
      );
    },
    new Map<Guard, Map<MinuteIndex, MinuteCount>>()
  );

export const getSleepiestGuard = (
  guardMinuteMap: Map<Guard, Map<MinuteIndex, MinuteCount>>
): Guard =>
  [
    ...[...guardMinuteMap]
      .reduce(
        (map, sleepMapEntry) =>
          map.set(
            sleepMapEntry[0],
            [...sleepMapEntry[1].values()].reduce((acc, curr) => acc + curr, 0)
          ),
        new Map<Guard, MinuteCount>()
      )
      .entries()
  ].reduce(
    (acc: [Guard, MinuteCount], curr: [Guard, MinuteCount]) =>
      curr[1] > acc[1] ? curr : acc,
    [0, 0]
  )[0];

export const getSleepiestMinuteIndex = (
  guard: Guard,
  guardMinuteMap: Map<Guard, Map<MinuteIndex, MinuteCount>>
): [MinuteIndex, MinuteCount] =>
  [...guardMinuteMap.get(guard)!.entries()].sort((a, b) =>
    a[1] > b[1] ? -1 : 1
  )[0];

export const getGuardSleepiestMinute = (
  guardMinuteMap: Map<Guard, Map<MinuteIndex, MinuteCount>>
): Map<Guard, [MinuteIndex, MinuteCount]> =>
  [...guardMinuteMap].reduce(
    (map, sleepMapEntry) =>
      map.set(
        sleepMapEntry[0],
        [...sleepMapEntry[1].entries()].reduce(
          (acc: [MinuteIndex, MinuteCount], curr: [MinuteIndex, MinuteCount]) =>
            curr[1] > acc[1] ? curr : acc,
          [0, 0]
        )
      ),
    new Map<Guard, [MinuteIndex, MinuteCount]>()
  );

export const getSleepiestGuardAndMinute = (
  map: Map<Guard, [MinuteIndex, MinuteCount]>
) => [...map.entries()].sort((a, b) => (a[1][1] > b[1][1] ? 1 : -1));
