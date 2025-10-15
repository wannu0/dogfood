//NutrientChart.tsx

import type { Nutrient } from "../types/types";

type Props = {
    nutrients: Nutrient[];
    averages: Record<string, number>;
    medians?: Record<string, number>; // 中央値をオプションとして追加
}

export default function NutrientChart({nutrients, averages, medians = {}}: Props){
    return(
    <div className="space-y-3 py-3 min-h-[120px]">
      {nutrients.map((n, i) => {
        const avg = averages[n.key] ?? 1;
        const median = medians[n.key] ?? undefined;
        const max = avg * 2;

        const widthPercent = (n.value / max) * 100;
        const avgPercent = (avg / max) * 100;
        const medianPercent = median !== undefined ? (median / max) * 100 : undefined;
        const delay = i * 100;

        return (
          <div key={i} className="relative flex items-center gap-2">
            {/* ラベル表示（バーの左側） */}
            <div className="w-20 text-sm text-gray-700">
              {n.name}
            </div>

            {/* バー背景＋中のバー */}
            <div className="relative flex-1 h-3 bg-gray-200 rounded overflow-hidden">
              {n.value === 0 ? (
                <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-500">
                  記載なし
                </div>
              ) : (
                <>
                  {/* 実際の値のバー */}
                  <div
                    className="bg-chartLine h-full rounded scale-x-0 origin-left animate-growBar"
                    style={{
                      width: `${widthPercent}%`,
                      animationDelay: `${delay}ms`,
                    }}
                  />

                  {/* 平均値（破線） */}
                  <div
                    className="absolute top-0 bottom-0 border-l-2 border-dashed border-avgLine"
                    style={{ left: `${avgPercent}%` }}
                  />

                  {/* 中央値（丸いマーカー） */}
                  {/* 
                  {medianPercent !== undefined && (
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-400 rounded-full"
                      style={{ left: `${medianPercent}%` }}
                    />
                  )}
                  */}
                </>
              )}
            </div>

            {/* 数値表示 */}
            <div className="w-20 text-sm text-right">
              { n.value === 0 ? ("-") : (`${n.value}`) }
              {n.unit}
              <span className="text-xs">{n.key === "protein" || n.key === "fat" ? " 以上" : " 以下"}</span>
            </div>
          </div>
       );
      })}

      {/* 凡例 */}
      <div className="text-xs text-gray-500 mt-2 flex gap-4 justify-end">
        <div>保証分析値</div>
        {/* 
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-gray-400 inline-block"></span> 掲載情報中央値
        </div>
        */}
        <div className="flex items-center gap-1">
          <span className="border-l-2 border-dashed border-avgLine h-3 inline-block"></span> 掲載フード平均
        </div>
      </div>
    </div>
  );
}
