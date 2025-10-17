//FoodCard.tsx
import { useState } from "react";
import type { FC } from "react";
import type { Food, GroupedFood, SelectedFood, MyPet } from "../types/types";
import { motion } from "framer-motion";
import FeatureIcons from "./FeatureIcons";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { calcDER } from "../utils/calories";

type Props = {
  myPet? : MyPet;
  groupedFood: GroupedFood;
  selectedFood: SelectedFood | null;
  setSelectedFood: (f: SelectedFood) => void;
};

const FoodCard: FC<Props> = ({ groupedFood, selectedFood, setSelectedFood, myPet }) => {
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const food = groupedFood.foods[index];


  //最大パッケージ------
  const largestVariant = food.variants.reduce((a, b) =>
    a.weight > b.weight ? a : b
  );
  //const pricePerKg = Math.round((largestVariant.price / largestVariant.weight) * 1000);
  //うちのこ情報を計算
  const der = myPet ? calcDER(myPet.weightKg, myPet.stage) : undefined;
  const dailyGrams = der && food.kcal ? Math.floor((der / food.kcal) * 100) : undefined;
  const daysPerBag = dailyGrams && dailyGrams > 0 ? Math.floor(largestVariant.weight / dailyGrams) : undefined;
  const pricePerDay = daysPerBag && daysPerBag > 0 ? Math.floor(largestVariant.price / daysPerBag) : undefined;


  const next = () => setIndex((i) => (i + 1) % groupedFood.foods.length);
  const prev = () => setIndex((i) => (i - 1 + groupedFood.foods.length) % groupedFood.foods.length);

  return (
    <div
      className="font-kosugi bg-white text-cardBaseFont rounded-2xl p-3 w-[300px] min-h-[400px]
        max-w-sm mx-auto flex flex-col transition-all duration-300 cursor-pointer"
      style={{
        boxShadow: isHovered
          ? "0 6px 16px rgba(0,0,0,0.2), 0 -6px 16px rgba(0,0,0,0.2)"
          : "0 4px 8px rgba(0,0,0,0.1), 0 -4px 8px rgba(0,0,0,0.1)",
      }}
      onClick={() => setSelectedFood({ food, groupedFood })}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* タイトル部分 */}
      <div className="h-[3.5rem] flex flex-col justify-center items-center text-center mb-2">
        <h2
          className={`font-noto font-bold leading-snug ${
            groupedFood.name.length >= 15 ? "text-base" : "text-xl"
          }`}
        >
          {groupedFood.name}
        </h2>
        {food.name_sub && (
          <p className="font-noto font-normal text-cardBaseFont_pale text-sm leading-none">
            {food.name_sub}
          </p>
        )}
      </div>

      {/* 画像とアニメーション部分 */}
      <div className="relative w-full h-[170px] overflow-hidden">
        {groupedFood.foods.map((f, i) => {
          const isActive = i === index;

          return (
            <motion.div
              key={i}
              className="absolute top-0 left-0 w-full h-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : 0.8,
                x: `${(i - index) * 100}%`,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <img
                src={`/images/${f.imgsrc}.png`}
                alt={f.name_sub}
                className="h-[160px] object-contain mx-auto"
              />
            </motion.div>
          );
        })}

        {/* 矢印 */}
        {groupedFood.foods.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-gray-600 hover:text-black"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-600 hover:text-black"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* アイコン・コメント・インジケーター */}
      <FeatureIcons food={food} />

      <div className="border border-cardBaseFont_pale text-xs text-cardBaseFont_pale rounded-[3px] mt-4 p-2 h-[5rem]">
        <div className="line-clamp-4 overflow-hidden">{food.comment}</div>
      </div>

      {myPet && (
        <div className="mt-4 text-sm bg-gray-100 p-2 rounded">
          <p>うちのこに必要量：{dailyGrams}g / 日</p>
          <p>1袋で約 {daysPerBag} 日分</p>
          <p>1日あたり約 {pricePerDay?.toLocaleString()}円
            <span className="text-xs text-cardBaseFont_palemore">{food.variants.length > 1 && (" ※最大パッケージ")}</span>
          </p>
        </div>
      )}

      {groupedFood.foods.length > 1 && (
        <div className="mt-2 flex justify-center space-x-2">
          {groupedFood.foods.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === index ? "bg-gray-800" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FoodCard;