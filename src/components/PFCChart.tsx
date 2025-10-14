// PFCChart.tsx
import { motion } from "framer-motion";

type PFC = {
  label: string;
  value: number;
};

const colors = {
  protein: "#6D6660",
  fat: "#6D6660",
  carb: "#6D6660",
};

export default function PFCChart({
  pfc,
  note,
  }: {
    pfc: Record<"protein" | "fat" | "carb", number>;
    note?: string | null;
  }) {
  const data: PFC[] = [
    { label: "タンパク質", value: pfc.protein },
    { label: "脂質", value: pfc.fat },
    { label: "炭水化物", value: pfc.carb },
  ];

  return (
    <div>
      <div className="flex justify-center gap-6 p-2">
        {data.map((item, i) => {
          const radius = 30;
          const circumference = 2 * Math.PI * radius;
          const percent = item.value;
          const dash = (percent / 100) * circumference;
          const offset = circumference - dash;
          const strokeColor =
            colors[item.label === "タンパク質" ? "protein" : item.label === "脂質" ? "fat" : "carb"];

          return (
            <div key={i} className="flex flex-col items-center">
              <svg width="80" height="80" viewBox="0 0 80 80" className="rotate-[-90deg]">
                {/* 背景円 */}
                <circle
                  cx="40"
                  cy="40"
                  r={radius}
                  fill="none"
                  stroke="#eee"
                  strokeWidth="8"
                />
                {/* アニメーション付き円 */}
                <motion.circle
                  cx="40"
                  cy="40"
                  r={radius}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference}
                  animate={{ strokeDashoffset: offset }}
                  transition={{ duration: 0.7 }}
                />
                <text
                  x="40"
                  y="45"
                  textAnchor="middle"
                  fontSize="14"
                  fill="#000"
                  transform="rotate(90 40 40)" // ← 回転戻す（-90の分）
                >
                  {item.value}%
                </text>
              </svg>
              <span className="text-sm mt-1">{item.label}</span>
            </div>
          );
        })}
      </div>
      {note && (
        <p className="text-xs text-red-600 text-right">{note}</p>
      )}
      <p className="text-cardBaseFont_pale text-xs text-right">Dry Matter Basis</p>
    </div>
  );
}