import { describe, it, expect } from "vitest";
import { grade, sgpa, computeTotal } from "./grade";

describe("grading", () => {
  it("maps marks to grades like the original system", () => {
    expect(grade(90)).toEqual(["A+", 10]);
    expect(grade(82)).toEqual(["A", 9]);
    expect(grade(74)).toEqual(["B+", 8]);
    expect(grade(64)).toEqual(["B", 7]);
    expect(grade(39)).toEqual(["F", 0]);
  });
  it("computes credit-weighted SGPA", () => {
    expect(sgpa([{ credits: 4, grade_point: 10 }, { credits: 4, grade_point: 9 }, { credits: 3, grade_point: 8 }])).toBe(9.09);
  });
  it("caps total at 100", () => {
    expect(computeTotal({ internal: 30, external: 60, practical: 0, assignment: 10, attendance: 10 }, false)).toBe(100);
  });
});
