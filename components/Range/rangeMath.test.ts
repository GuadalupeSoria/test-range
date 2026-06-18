import { describe, expect, it } from "vitest"
import { getPercent, getValue, getFixedPercent, getFixedValue } from "./rangeMath"

describe("getPercent", () => {
  it("returns 0 for the min value", () => {
    expect(getPercent(0, 0, 100)).toBe(0)
  })

  it("returns 100 for the max value", () => {
    expect(getPercent(100, 0, 100)).toBe(100)
  })

  it("returns the right percent for a value in between", () => {
    expect(getPercent(25, 0, 100)).toBe(25)
  })
})

describe("getValue", () => {
  it("returns the min when percent is 0", () => {
    expect(getValue(0, 0, 100)).toBe(0)
  })

  it("returns the max when percent is 100", () => {
    expect(getValue(100, 0, 100)).toBe(100)
  })

  it("rounds correctly", () => {
    expect(getValue(33.6, 0, 100)).toBe(34)
  })

  it("snaps to step when provided", () => {
    expect(getValue(22, 0, 100, 10)).toBe(20)
  })
})

describe("getFixedPercent", () => {
  const values = [1.99, 5.99, 10.99, 30.99, 50.99, 70.99]

  it("first value is 0%", () => {
    expect(getFixedPercent(1.99, values)).toBe(0)
  })

  it("last value is 100%", () => {
    expect(getFixedPercent(70.99, values)).toBe(100)
  })

  it("distributes by index not by the actual value", () => {
    expect(getFixedPercent(10.99, values)).toBe(40)
  })
})

describe("getFixedValue", () => {
  const values = [1.99, 5.99, 10.99, 30.99, 50.99, 70.99]

  it("returns the closest value", () => {
    expect(getFixedValue(0, values)).toBe(1.99)
    expect(getFixedValue(100, values)).toBe(70.99)
    expect(getFixedValue(38, values)).toBe(10.99)
  })
})
