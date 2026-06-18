export const getPercent = (value: number, min: number, max: number) =>
  ((value - min) / (max - min)) * 100

export const getValue = (percent: number, min: number, max: number, step = 1) => {
  const raw = min + (percent / 100) * (max - min)
  return Math.round(raw / step) * step
}

export const getFixedPercent = (value: number, values: number[]) => {
  const last = values.length - 1
  return (values.indexOf(value) / last) * 100
}

export const getFixedValue = (percent: number, values: number[]) => {
  const last = values.length - 1
  const idx = Math.round((percent / 100) * last)
  return values[idx]
}
