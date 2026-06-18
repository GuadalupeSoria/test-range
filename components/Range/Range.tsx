"use client"

import { RangeProps } from "./types"
import { useRangeDrag } from "./useRangeDrag"
import { getPercent, getValue, getFixedPercent, getFixedValue } from "./rangeMath"
import "./range.css"

export const Range = (props: RangeProps) => {
  const { value, onChange } = props
  const fixed = props.values

  const min = fixed ? fixed[0] : props.min ?? 0
  const max = fixed
    ? fixed[fixed.length - 1]
    : props.max ?? 100

  const toPercent = (v: number) =>
    fixed ? getFixedPercent(v, fixed) : getPercent(v, min, max)

  const toValue = (pct: number) => {
    if (fixed) return getFixedValue(pct, fixed)
    return getValue(pct, min, max)
  }

  const { trackRef, dragging, dragEvents } = useRangeDrag({
    min, max, value, onChange,
    getValue: toValue,
  })

  const [minVal, maxVal] = value
  const minPct = toPercent(minVal)
  const maxPct = toPercent(maxVal)

  const handleLabelClick = (v: number) => {
    const distMin = Math.abs(v - minVal)
    const distMax = Math.abs(v - maxVal)
    if (distMin <= distMax) {
      onChange([Math.min(v, maxVal), maxVal])
    } else {
      onChange([minVal, Math.max(v, minVal)])
    }
  }

  return (
    <div style={{ width: "100%" }}>
      <div ref={trackRef} className="bar">
        <div
          className="bar-progress"
          style={{ left: `${minPct}%`, right: `${100 - maxPct}%` }}
        />
        <div
          {...dragEvents("min")}
          data-testid="handler-min"
          className={`handler min ${dragging === "min" ? "dragging" : ""}`}
          style={{ left: `${minPct}%` }}
        />
        <div
          {...dragEvents("max")}
          data-testid="handler-max"
          className={`handler max ${dragging === "max" ? "dragging" : ""}`}
          style={{ left: `${maxPct}%` }}
        />
      </div>

      {props.values && (
        <div className="range-labels">
          {props.values.map((v) => (
            <span
              key={v}
              onClick={() => handleLabelClick(v)}
              className={`range-label ${v >= minVal && v <= maxVal ? "selected" : ""}`}
              style={{ left: `${toPercent(v)}%` }}
            >
              {props.formatValue ? props.formatValue(v) : v}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}