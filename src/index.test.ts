import { returnTheSameThing } from "./index";

describe("My function", () => {
  test("It returns the thing that is passed in", () => {
    expect(returnTheSameThing("4")).toEqual("4");
  });
});
