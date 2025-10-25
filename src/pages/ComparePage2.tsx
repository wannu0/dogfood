// src/pages/ComparePage.tsx
import React from "react";
import type { FoodWithGroup } from "@/types/types";

interface ComparePageProps {
  favorites: FoodWithGroup[];
  toggleFavorite: (f: FoodWithGroup) => void;
  onClose: () => void;
  nutrientAvg: Record<string, number>;  //平均値オブジェクト
  nutrientMedian: Record<string, number>;  //中央値オブジェクト
}

const ComparePage: React.FC<ComparePageProps> = ({ favorites }) => {
  // 動的高さ調整用の集計
  const hasNameSub = favorites.some((item) => !!item.food.name_sub);
  const maxVariantsLength = Math.max(
    ...favorites.map((item) => item.food.variants.length)
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">お気に入りフードの比較</h1>

      <div className="overflow-x-auto">
        <div className="grid grid-cols-[200px_repeat(auto-fill,minmax(250px,1fr))] gap-4">
          {/* 見出し列 */}
          <div className="font-semibold text-gray-700 space-y-4">
            <div>商品名</div>
            <div>タンパク質 (%)</div>
            <div>脂質 (%)</div>
            <div>粗繊維 (%)</div>
            <div>PFCバランス</div>
            <div>最大パッケージ価格</div>
            <div>パッケージバリエーション</div>
          </div>

          {/* フード列 */}
          {favorites.map((item) => {
            const food = item.food;
            const largest = food.variants.reduce((a, b) =>
              a.weight > b.weight ? a : b
            );

            // PFCバランス（おおよその比率）
            const protein = food.nutrients?.protein ?? 0;
            const fat = food.nutrients?.fat ?? 0;
            const fiber = food.nutrients?.fiber ?? 0;
            const carb = 100 - protein - fat - fiber;

            return (
              <div key={food.name_sub} className="space-y-4">
                <div className={hasNameSub ? "min-h-[50px]" : "min-h-[30px]"}>
                  {item.groupedFood.name}
                  {food.name_sub && (
                    <div className="text-sm text-gray-500">{food.name_sub}</div>
                  )}
                </div>
                <div>{protein}</div>
                <div>{fat}</div>
                <div>{fiber}</div>
                <div>{`${protein} : ${fat} : ${carb}`}</div>
                <div>
                  ¥{largest.price.toLocaleString()}<br />
                  <span className="text-sm text-gray-500">
                    ({largest.weight}g)
                  </span>
                </div>
                <div
                  className="text-sm"
                  style={{ minHeight: `${maxVariantsLength * 20}px` }}
                >
                  {food.variants.map((v, i) => (
                    <div key={i}>
                      {v.weight}g - ¥{v.price.toLocaleString()}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ComparePage;
