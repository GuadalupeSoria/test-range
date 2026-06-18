"use client"

import { useState } from "react"
import "../Range/range.css"

interface Props {
  value: number
  min: number
  max: number
  onCommit: (value: number) => void
}

export const EditableLabel = (props: Props) => {
  const { value, min, max, onCommit } = props
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(String(value))

  const handleSave = () => {
    const parsed = Number(draft)
    if (!Number.isNaN(parsed)) {
      onCommit(Math.min(Math.max(parsed, min), max))
    }
    setEditing(false)
  }

  if (editing) {
    return (
      <input
        type="text"
        inputMode="numeric"
        autoFocus
        className="label-edit"
        value={draft}
        onChange={(e) => setDraft(e.target.value.replace(/\D/g, ""))}
        onBlur={handleSave}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSave()
          if (e.key === "Escape") setEditing(false)
        }}
      />
    )
  }

  return (
    <button
      type="button"
      className="label"
      onClick={() => {
        setDraft(String(value))
        setEditing(true)
      }}
    >
      ${value}
    </button>
  )
}
