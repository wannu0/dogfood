//FoodListModal.tsx
import { useEffect, useRef, useState } from "react";
import type { Food, GroupedFood, SelectedFood } from "../types/types";
import FeatureIcons from "./FeatureIcons";

interface Props {
  foods: Food[];
  foodGroup: GroupedFood;
  onSelect: (food: Food) => void;
  onClose: () => void;
}

export default function FoodListModal({ foods, foodGroup, onSelect, onClose }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showArrows, setShowArrows] = useState(foods.length > 3);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const scroll = (dir: "left" | "right") => {
    if (!containerRef.current) return;
    const scrollAmount = containerRef.current.offsetWidth * 0.5;
    containerRef.current.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      {/* 背景クリックで閉じる */}
      <div className="fixed inset-0" onClick={onClose}></div>

      {/* カードスライダー本体 */}
      <div className="relative w-full max-w-6xl px-10" onClick={onClose}>
        {showArrows && (
          <button onClick={(e) =>{e.stopPropagation(); scroll("left")}} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full w-8 h-8 flex items-center justify-center">←</button>
        )}

        <div
          ref={containerRef}
          className={`flex overflow-x-auto space-x-6 px-4 py-6 scrollbar-hide snap-x snap-mandatory
            ${foods.length <= 3 ? "justify-center":""}`}
        >
          {foods.map((food) => (
            <div
              key={food.food_id}
              onClick={(e) => {
                e.stopPropagation(); // ←クリックが親に伝わらないようにする
                onSelect(food)}}
              className="min-w-[260px] max-w-[280px] flex-shrink-0 bg-white rounded-xl p-4 shadow hover:shadow-md cursor-pointer snap-center"
            >
              <img src={`/images/${food.imgsrc}.png`} alt={food.name_sub} className="w-full h-[160px] object-contain mb-2" />
              <p className="text-sm font-semibold text-center mb-1">{food.name_sub}</p>
              <div className="text-xs text-gray-600 mb-2 line-clamp-8">{food.comment}</div>
              <div className="flex justify-center mb-[1rem]">
                <FeatureIcons food={food} />
              </div>
              <div className="pt-3 w-[90%]">
                <div className={`space-y-1 text-xs`}>
                    {food.variants.map((v, i) => {
                    const weightText = v.weight >= 1000 ? `${(v.weight / 1000).toFixed(1)}kg` : `${v.weight}g`;
                    const priceText = `${v.price.toLocaleString()}円`;
                    const perKg = `${((v.price / v.weight) * 1000).toFixed(0)}円 / kg`;

                    return (
                        <div key={i} className="flex w-full font-roboto">
                        <div className="w-[25%] text-right">{weightText}</div>
                        <div className="w-[35%] text-right">{priceText}</div>
                        <div className="w-[40%] text-right text-gray-500">({perKg})</div>
                        </div>
                    );
                    })}
                </div>
            </div>
            </div>
          ))}
        </div>

        {showArrows && (
          <button onClick={(e) => {e.stopPropagation(); scroll("right")}} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full w-8 h-8 flex items-center justify-center">→</button>
        )}
      </div>
    </div>
  );
}