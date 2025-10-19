// RangeSliderDemo.tsx

import { useState } from "react"
import { Slider } from "@/components/ui/slider"

export default function RangeSliderDemo() {
  const [range, setRange] = useState<[number, number]>([20, 40])

  return (
    <div className="max-w-md mx-auto p-4 bg-sky-100 rounded">
      <label className="block font-semibold mb-2">タンパク質（%）</label>
      <Slider
        min={10}
        max={50}
        step={0.5}
        value={range}
        onValueChange={(newRange) => {
          console.log("value changed:", newRange)
          setRange(newRange as [number, number])
        }}
      />
      <div className="flex justify-between mt-2 text-sm">
        <span>{range[0]}%</span>
        <span>{range[1]}%</span>
      </div>
    </div>
  )
}