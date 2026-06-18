"use client"

import { useEffect, useState } from "react"
import { Range, RangeValue } from "@/components/Range"
import { BackButton } from "@/components/BackButton"

interface Data {
  rangeValues: number[]
}

export default function Exercise2() {
  const [values, setValues] = useState<number[] | null>(null)
  const [value, setValue] = useState<RangeValue>([0, 0])

  useEffect(() => {
    fetch("/api/fixed-range")
      .then((res) => res.json())
      .then((data: Data) => {
        setValues(data.rangeValues)
        setValue([data.rangeValues[0], data.rangeValues[data.rangeValues.length - 1]])
      })
  }, [])

  if (!values) return <main className="page"><BackButton /><p>Cargando...</p></main>

  return (
    <main className="page">
      <BackButton />
      <div className="content">
        <Range
          values={values}
          value={value}
          onChange={setValue}
          formatValue={(v) => `$${v}`}
        />
      </div>
    </main>
  )
}
