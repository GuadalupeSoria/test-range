export type RangeValue = [number, number]

export type Handle = "min" | "max"

export interface RangeProps {
  value: RangeValue
  onChange: (value: RangeValue) => void
  min?: number
  max?: number
  values?: number[]
  formatValue?: (value: number) => string
}
