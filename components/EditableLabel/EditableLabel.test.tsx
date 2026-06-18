import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { EditableLabel } from "./EditableLabel"

describe("EditableLabel", () => {
  it("shows the value by default", () => {
    render(<EditableLabel value={42} min={0} max={100} onCommit={() => {}} />)
    expect(screen.getByText("$42")).toBeInTheDocument()
  })

  it("becomes an input when clicked", async () => {
    render(<EditableLabel value={42} min={0} max={100} onCommit={() => {}} />)
    await userEvent.click(screen.getByText("$42"))
    expect(screen.getByDisplayValue("42")).toBeInTheDocument()
  })

  it("only allows numbers", async () => {
    render(<EditableLabel value={42} min={0} max={100} onCommit={() => {}} />)
    await userEvent.click(screen.getByText("$42"))

    const input = screen.getByDisplayValue("42")
    await userEvent.clear(input)
    await userEvent.type(input, "a-1b2!")

    expect(input).toHaveValue("12")
  })

  it("clamps to max on Enter", async () => {
    const onCommit = vi.fn()
    render(<EditableLabel value={42} min={0} max={50} onCommit={onCommit} />)
    await userEvent.click(screen.getByText("$42"))

    const input = screen.getByDisplayValue("42")
    await userEvent.clear(input)
    await userEvent.type(input, "999")
    await userEvent.keyboard("{Enter}")

    expect(onCommit).toHaveBeenCalledWith(50)
  })

  it("cancels on Escape", async () => {
    const onCommit = vi.fn()
    render(<EditableLabel value={42} min={0} max={100} onCommit={onCommit} />)
    await userEvent.click(screen.getByText("$42"))

    await userEvent.keyboard("{Escape}")

    expect(onCommit).not.toHaveBeenCalled()
  })
})
