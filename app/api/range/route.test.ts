import { describe, expect, it } from "vitest"
import { GET } from "./route"

describe("GET /api/range", () => {
  it("returns min and max values", async () => {
    const response = await GET()
    const body = await response.json()

    expect(body).toEqual({ min: 1, max: 100 })
  })
})
