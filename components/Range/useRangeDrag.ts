"use client"

import { useRef, useState, type PointerEvent } from "react"
import { Handle, RangeValue } from "./types"

interface Props {
  min: number
  max: number
  value: RangeValue
  onChange: (value: RangeValue) => void
  getValue: (percent: number) => number
}

const clamp = (n: number, lo: number, hi: number) =>
  Math.min(Math.max(n, lo), hi)

export const useRangeDrag = (props: Props) => {
  const { min, max, value, onChange, getValue } = props
  const trackRef = useRef<HTMLDivElement>(null)
  const draggingRef = useRef<Handle | null>(null)
  const [dragging, setDragging] = useState<Handle | null>(null)

  const getValueFromX = (clientX: number) => {
    const track = trackRef.current
    if (!track) return min
    const rect = track.getBoundingClientRect()
    const pct = clamp(((clientX - rect.left) / rect.width) * 100, 0, 100)
    return getValue(pct)
  }

  const handleUpdate = (handle: Handle, raw: number) => {
    const [lo, hi] = value
    if (handle === "min") {
      onChange([clamp(raw, min, hi), hi])
    } else {
      onChange([lo, clamp(raw, lo, max)])
    }
  }

  const dragEvents = (handle: Handle) => ({
    onPointerDown: (e: PointerEvent) => {
      e.preventDefault()
      const target = e.target as HTMLElement
      target.setPointerCapture?.(e.pointerId)
      draggingRef.current = handle
      setDragging(handle)
    },
    onPointerMove: (e: PointerEvent) => {
      if (draggingRef.current !== handle) return
      handleUpdate(handle, getValueFromX(e.clientX))
    },
    onPointerUp: (e: PointerEvent) => {
      const target = e.target as HTMLElement
      target.releasePointerCapture?.(e.pointerId)
      draggingRef.current = null
      setDragging(null)
    },
  })

  return { trackRef, dragging, dragEvents }
}
