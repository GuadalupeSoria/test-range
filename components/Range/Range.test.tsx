import { describe, expect, it, vi } from "vitest"
import { fireEvent, render, screen } from "@testing-library/react"
import { Range } from "./Range"

const mockBar = {
  left: 0, right: 200, width: 200, top: 0, bottom: 0, height: 0, x: 0, y: 0, toJSON: () => {},
} as DOMRect

describe("Range", () => {
  it("renders handles at the right position", () => {
    render(<Range min={0} max={100} value={[20, 70]} onChange={() => {}} />)

    expect(screen.getByTestId("handler-min")).toHaveStyle({ left: "20%" })
    expect(screen.getByTestId("handler-max")).toHaveStyle({ left: "70%" })
  })

  it("calls onChange when dragging", () => {
    vi.spyOn(HTMLDivElement.prototype, "getBoundingClientRect").mockReturnValue(mockBar)

    const onChange = vi.fn()
    render(<Range min={0} max={100} value={[20, 70]} onChange={onChange} />)

    const min = screen.getByTestId("handler-min")
    fireEvent.pointerDown(min, { pointerId: 1, clientX: 40 })
    fireEvent.pointerMove(min, { pointerId: 1, clientX: 60 })

    expect(onChange).toHaveBeenLastCalledWith([30, 70])
  })

  it("min handle cant go past max", () => {
    vi.spyOn(HTMLDivElement.prototype, "getBoundingClientRect").mockReturnValue(mockBar)

    const onChange = vi.fn()
    render(<Range min={0} max={100} value={[20, 70]} onChange={onChange} />)

    const min = screen.getByTestId("handler-min")
    fireEvent.pointerDown(min, { pointerId: 1, clientX: 40 })
    fireEvent.pointerMove(min, { pointerId: 1, clientX: 180 })

    expect(onChange).toHaveBeenLastCalledWith([70, 70])
  })

  it("max handle cant go past min", () => {
    vi.spyOn(HTMLDivElement.prototype, "getBoundingClientRect").mockReturnValue(mockBar)

    const onChange = vi.fn()
    render(<Range min={0} max={100} value={[20, 70]} onChange={onChange} />)

    const max = screen.getByTestId("handler-max")
    fireEvent.pointerDown(max, { pointerId: 1, clientX: 140 })
    fireEvent.pointerMove(max, { pointerId: 1, clientX: 10 })

    expect(onChange).toHaveBeenLastCalledWith([20, 20])
  })

  it("adds dragging class while dragging", () => {
    render(<Range min={0} max={100} value={[20, 70]} onChange={() => {}} />)

    const min = screen.getByTestId("handler-min")
    fireEvent.pointerDown(min, { pointerId: 1, clientX: 40 })

    expect(min.className).toContain("dragging")
  })

  it("stops updating after pointer up", () => {
    vi.spyOn(HTMLDivElement.prototype, "getBoundingClientRect").mockReturnValue(mockBar)

    const onChange = vi.fn()
    render(<Range min={0} max={100} value={[20, 70]} onChange={onChange} />)

    const min = screen.getByTestId("handler-min")
    fireEvent.pointerDown(min, { pointerId: 1, clientX: 40 })
    fireEvent.pointerUp(min, { pointerId: 1 })
    onChange.mockClear()
    fireEvent.pointerMove(min, { pointerId: 1, clientX: 100 })

    expect(onChange).not.toHaveBeenCalled()
  })
})

describe("Range with fixed values", () => {
  const values = [1.99, 5.99, 10.99, 30.99, 50.99, 70.99]

  it("handles start at the edges", () => {
    render(<Range values={values} value={[1.99, 70.99]} onChange={() => {}} />)

    expect(screen.getByTestId("handler-min")).toHaveStyle({ left: "0%" })
    expect(screen.getByTestId("handler-max")).toHaveStyle({ left: "100%" })
  })

  it("snaps to nearest fixed value when dragged", () => {
    vi.spyOn(HTMLDivElement.prototype, "getBoundingClientRect").mockReturnValue({
      left: 0, right: 500, width: 500, top: 0, bottom: 0, height: 0, x: 0, y: 0, toJSON: () => {},
    } as DOMRect)

    const onChange = vi.fn()
    render(<Range values={values} value={[1.99, 70.99]} onChange={onChange} />)

    const min = screen.getByTestId("handler-min")
    fireEvent.pointerDown(min, { pointerId: 1, clientX: 0 })
    fireEvent.pointerMove(min, { pointerId: 1, clientX: 210 })

    expect(onChange).toHaveBeenLastCalledWith([10.99, 70.99])
  })

  it("renders a label for each value", () => {
    render(
      <Range
        values={values}
        value={[1.99, 70.99]}
        onChange={() => {}}
        formatValue={(v) => `$${v}`}
      />
    )

    values.forEach((v) => {
      expect(screen.getByText(`$${v}`)).toBeInTheDocument()
    })
  })
})
