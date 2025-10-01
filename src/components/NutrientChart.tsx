import type { Nutrient } from "../types";

type Props = {
    nutrients: Nutrient[];
    averages: Record<string, number>;
}

export default function NutrientChart({nutrients,averages}:Props){

    //スケール最大値は各成分の平均値の2倍の中で最大のものを使う　←うーん？
    //const doubleAverages = Object.values(averages).map((v)=>v*2);
    //const scaleMax = Math.max(...doubleAverages, 1);

    return(
    <div className="space-y-4 py-4 min-h-[120px]">
      {nutrients.map((n, i) => {
        const avg = averages[n.key] ?? 1; // name→key対応が必要
        const max = avg * 2;

        const widthPercent = (n.value / max) * 100;

        const delay = i * 100; // 順番に表示（100msずつ遅らせる）
        //const avgPercent = 50; // 中央に固定　//(avg / scaleMax) * 100;

        return (
          <div key={i} className="relative flex items-center gap-2">
            {/* ラベル表示（バーの左側） */}
            <div className="w-20 text-sm text-gray-700">
              {n.name}
            </div>

            {/* バー背景＋中のバー */}
            <div className="relative flex-1 h-5 bg-gray-200 rounded overflow-hidden">
              
              {/* 中のバー */}
              {n.value === 0 ? (
                <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-500">
                記載なし
                </div>
                ) : (
                <>
                <div
                    className="bg-chartLine h-full rounded scale-x-0 origin-left animate-growBar"
                    style={{
                    width: `${widthPercent}%`,
                    animationDelay: `${delay}ms`,
                    }}
                />
                <div className="absolute top-0 bottom-0 left-1/2 border border-dashed border-avgLine" />
                </>
                )}

              {/* 基準線（平均値）縦線(中央に固定) */}
              <div className="absolute top-0 bottom-0 left-1/2 border border-dashed border-avgLine" />
            </div>

            {/* 数値表示 */}
            <div className="w-20 text-sm text-right">
              { n.value === 0 ? ("-") : (`${n.value}`) }
              {n.unit}
              <span className="text-xs">{n.key === "protein" || n.key === "fat" ? " 以上":" 以下"}</span>
            </div>
          </div>
       );
      })}
    </div>
  );
}