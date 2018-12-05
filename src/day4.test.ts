import {
  getGuardMinuteMap,
  getGuardSleepiestMinute,
  getSleepiestGuard,
  getSleepiestGuardAndMinute,
  getSleepiestMinuteIndex,
  LogEntryTypes,
  parseGuardNumber,
  parseLogEntry,
  parseTimeString,
  RawLogEntry,
  sortLogs
} from "./day4";
import { log } from "./inputs/day4";

const exampleLogEntries: RawLogEntry[] = [
  { timeStamp: "1518-11-01 00:00", description: "Guard #10 begins shift" },
  { timeStamp: "1518-11-01 00:05", description: "falls asleep" },
  { timeStamp: "1518-11-01 00:25", description: "wakes up" },
  { timeStamp: "1518-11-01 00:30", description: "falls asleep" },
  { timeStamp: "1518-11-01 00:55", description: "wakes up" },
  { timeStamp: "1518-11-01 23:58", description: "Guard #99 begins shift" },
  { timeStamp: "1518-11-02 00:40", description: "falls asleep" },
  { timeStamp: "1518-11-02 00:50", description: "wakes up" },
  { timeStamp: "1518-11-03 00:05", description: "Guard #10 begins shift" },
  { timeStamp: "1518-11-03 00:24", description: "falls asleep" },
  { timeStamp: "1518-11-03 00:29", description: "wakes up" },
  { timeStamp: "1518-11-04 00:02", description: "Guard #99 begins shift" },
  { timeStamp: "1518-11-04 00:36", description: "falls asleep" },
  { timeStamp: "1518-11-04 00:46", description: "wakes up" },
  { timeStamp: "1518-11-05 00:03", description: "Guard #99 begins shift" },
  { timeStamp: "1518-11-05 00:45", description: "falls asleep" },
  { timeStamp: "1518-11-05 00:55", description: "wakes up" }
];

describe("parseTimeString", () => {
  it("Should parse the time correctly when the hour and minute are 0", () => {
    expect(parseTimeString("1518-12-01 00:00")).toEqual({
      month: 12,
      day: 1,
      hour: 0,
      minute: 0
    });
  });

  it("Should parse the time correctly when the hour and minute are non-zero", () => {
    expect(parseTimeString("1518-06-09 12:17")).toEqual({
      month: 6,
      day: 9,
      hour: 12,
      minute: 17
    });
  });
});

describe("parseGuardNumber", () => {
  it("should parse guard numbers size one digit", () => {
    expect(parseGuardNumber("Guard #9 begins shift")).toEqual(9);
  });

  it("should parse guard numbers size two digits", () => {
    expect(parseGuardNumber("Guard #99 begins shift")).toEqual(99);
  });

  it("should parse guard numbers bigger than 2 digits big LOL", () => {
    expect(parseGuardNumber("Guard #9978 begins shift")).toEqual(9978);
  });
});

describe("parseLogEntry", () => {
  const testTime = {
    month: 11,
    day: 3,
    hour: 0,
    minute: 5
  };
  it("should parse a guard change log entry", () => {
    const entry = {
      timeStamp: "1518-11-03 00:05",
      description: "Guard #10 begins shift"
    };
    expect(parseLogEntry(entry.description, entry.timeStamp)).toEqual({
      time: testTime,
      type: LogEntryTypes.GUARD_CHANGED,
      sortableTime: 11030005,
      guardNumber: 10
    });
  });

  it("should parse a falls asleep log entry", () => {
    const entry = {
      timeStamp: "1518-11-03 00:05",
      description: "falls asleep"
    };
    expect(parseLogEntry(entry.description, entry.timeStamp)).toEqual({
      time: testTime,
      type: LogEntryTypes.FALLS_ASLEEP,
      sortableTime: 11030005
    });
  });

  it("should parse a wakes up log entry", () => {
    const entry = {
      timeStamp: "1518-11-03 00:05",
      description: "wakes up"
    };
    expect(parseLogEntry(entry.description, entry.timeStamp)).toEqual({
      time: testTime,
      type: LogEntryTypes.WAKES_UP,
      sortableTime: 11030005
    });
  });
});

describe("sortLogs", () => {
  const randomOrderLogs = [
    { timeStamp: "1518-11-03 00:24", description: "falls asleep" },
    { timeStamp: "1518-11-05 00:45", description: "falls asleep" },
    { timeStamp: "1518-11-04 00:36", description: "falls asleep" },
    { timeStamp: "1518-11-04 00:02", description: "Guard #99 begins shift" },
    { timeStamp: "1518-11-05 00:55", description: "wakes up" },
    { timeStamp: "1518-11-03 00:29", description: "wakes up" },
    { timeStamp: "1518-11-05 00:03", description: "Guard #99 begins shift" },
    { timeStamp: "1518-11-04 00:46", description: "wakes up" }
  ].map(log => parseLogEntry(log.description, log.timeStamp));

  const sortedOrderLogs = [
    { timeStamp: "1518-11-03 00:24", description: "falls asleep" },
    { timeStamp: "1518-11-03 00:29", description: "wakes up" },
    { timeStamp: "1518-11-04 00:02", description: "Guard #99 begins shift" },
    { timeStamp: "1518-11-04 00:36", description: "falls asleep" },
    { timeStamp: "1518-11-04 00:46", description: "wakes up" },
    { timeStamp: "1518-11-05 00:03", description: "Guard #99 begins shift" },
    { timeStamp: "1518-11-05 00:45", description: "falls asleep" },
    { timeStamp: "1518-11-05 00:55", description: "wakes up" }
  ].map(log => parseLogEntry(log.description, log.timeStamp));

  it("should sort these logs in chronological order....", () => {
    expect(sortLogs(randomOrderLogs)).toEqual(sortedOrderLogs);
  });
});

describe("getSleepiestGuard", () => {
  it("should get the sleepiest guard", () => {
    expect(getSleepiestGuard(getGuardMinuteMap(exampleLogEntries))).toEqual(10);
  });

  // it("should get the sleepiest guard in the puzzle input", () => {
  //   expect(getSleepiestGuard(getGuardMinuteMap(log))).toEqual(
  //     "the sleepiest guard"
  //   );
  // });
});

describe("getSleepiestMinute", () => {
  it("should get the sleepiest minute", () => {
    const minuteMap = getGuardMinuteMap(exampleLogEntries);
    expect(getSleepiestMinuteIndex(10, minuteMap)).toEqual([24, 2]);
  });

  // it("should get the sleepiest minute", () => {
  //   const minuteMap = getGuardMinuteMap(log);
  //   expect(getSleepiestMinuteIndex("the sleepiest guard", minuteMap)).toEqual(
  //     "the sleepiest minute.."
  //   );
  // });
});

describe("getGuardSleepiestMinute", () => {
  // it("should get the right thing from the example data", () => {
  //   const minuteMap = getGuardMinuteMap(exampleLogEntries);
  //   expect(getGuardSleepiestMinute(minuteMap)).toEqual("");
  // });
  // it("should get the right thing from the real data", () => {
  //   const minuteMap = getGuardMinuteMap(log);
  //   expect(
  //     getSleepiestGuardAndMinute(getGuardSleepiestMinute(minuteMap))
  //   ).toEqual("");
  // });
});
