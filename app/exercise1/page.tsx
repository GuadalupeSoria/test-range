"use client"

import { useEffect, useState } from "react"
import { Range, RangeValue } from "@/components/Range"
import { EditableLabel } from "@/components/EditableLabel"
import { BackButton } from "@/components/BackButton"

interface Bounds {
  min: number
  max: number
}

export default function Exercise1() {
  const [bounds, setBounds] = useState<Bounds | null>(null)
  const [value, setValue] = useState<RangeValue>([0, 0])

  useEffect(() => {
    fetch("/api/range")
      .then((res) => res.json())
      .then((data: Bounds) => {
        setBounds(data)
        setValue([data.min, data.max])
      })
  }, [])

  if (!bounds) return <main className="page"><BackButton /><p>Cargando...</p></main>

  return (
    <main className="page">
      <BackButton />
      <div className="content">
        <Range min={bounds.min} max={bounds.max} value={value} onChange={setValue} />
        <div className="numbers">
          <EditableLabel
            value={value[0]}
            min={bounds.min}
            max={bounds.max}
            onCommit={(v) => setValue([v, Math.max(v, value[1])])}
          />
          <EditableLabel
            value={value[1]}
            min={bounds.min}
            max={bounds.max}
            onCommit={(v) => setValue([Math.min(v, value[0]), v])}
          />
        </div>
      </div>
    </main>
  )
}
