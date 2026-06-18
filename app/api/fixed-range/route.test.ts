import { describe, expect, it } from "vitest"
import { GET } from "./route"

describe("GET /api/fixed-range", () => {
  it("returns the fixed values array", async () => {
    const response = await GET()
    const body = await response.json()

    expect(body).toEqual({ rangeValues: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99] })
  })
})
