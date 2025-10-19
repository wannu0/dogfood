"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";

export interface DualRangeSliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  /** 例: "タンパク質 (%)" */
  label?: string;
  /** ツマミ上に値を表示する場合 true */
  showValue?: boolean;
  /** ステップ間隔 */
  step?: number;
}

/**
 * shadcn/ui スタイル準拠のデュアルレンジスライダー
 * - 両端のツマミをドラッグして範囲を指定
 * - props.value は [min, max] の配列
 */
export const DualRangeSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  DualRangeSliderProps
>(({ className, label, showValue = false, step = 0.5, ...props }, ref) => {
  const [values, setValues] = React.useState<[number, number]>(
    (props.value as [number, number]) ?? [0, 100]
  );

  React.useEffect(() => {
    if (Array.isArray(props.value)) {
      setValues(props.value as [number, number]);
    }
  }, [props.value]);

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold mb-1 text-gray-700">
          {label}
        </label>
      )}
      <SliderPrimitive.Root
        ref={ref}
        step={step}
        min={props.min ?? 0}
        max={props.max ?? 100}
        value={values}
        onValueChange={(newValues) => {
          setValues(newValues as [number, number]);
          props.onValueChange?.(newValues);
        }}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className
        )}
      >
        <SliderPrimitive.Track
          className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-gray-300"
        />
        <SliderPrimitive.Range
          className="absolute h-full bg-sliderColor"
        />

        {/* 両端ツマミ */}
        {values.map((v, i) => (
          <SliderPrimitive.Thumb
            key={i}
            className={cn(
              "block h-4 w-4 rounded-full border border-sliderColor bg-white shadow-sm",
              "transition-all duration-200",
              "hover:ring-4 hover:ring-gray-300 hover:ring-opacity-50",
              "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gray-400 focus-visible:ring-opacity-70"
              //"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sliderColor_pale focus-visible:ring-offset-3 focus-visible:ring-offset-sliderColor_pale"
            )}
          >
            {showValue && (
              <span className="absolute -top-6 text-xs text-gray-700">
                {v.toFixed(1)}%
              </span>
            )}
          </SliderPrimitive.Thumb>
        ))}
      </SliderPrimitive.Root>

      {/* 下部の数値表示 */}
      <div className="flex justify-between mt-1 text-xs text-gray-700">
        <span>{values[0].toFixed(1)}%</span>
        <span>{values[1].toFixed(1)}%</span>
      </div>
    </div>
  );
});

DualRangeSlider.displayName = "DualRangeSlider";