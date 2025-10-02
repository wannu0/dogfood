// components/FoodCard.tsx
import { useState } from "react";
import type { FC } from "react";
import type { Food, GroupedFood, Variant } from "../types";
import FeatureIcons from "./FeatureIcons";
import Carousel from "./Carousel";
import FoodList from "../FoodList";

type Props = {
  //food: Food;
  groupedFood: GroupedFood;
  //dailyGrams?: number;
  //pricePerDay?: string;
  //daysPerBag?: number;
  selectedFood: Food | null;
  setSelectedFood: (f: Food) => void;
};

function shouldShowUserStatus(
  dailyGrams?: number,
  pricePerDay?: string,
  daysPerBag?: number
): boolean {
  return (
    dailyGrams !== undefined &&
    pricePerDay !== undefined &&
    daysPerBag !== undefined
  );
}

const FoodCard: FC<Props> = ({
  groupedFood,
  //food,
  //dailyGrams,
  //pricePerDay,
  //daysPerBag,
  setSelectedFood,
}) => {
  //今見せてるバリエーションのindex（※フードブランド内のバリエーション。ポルトリー/サーモンとか）
  const [currentIndex, setCurrentIndex] = useState(0);
  const food = groupedFood.foods[currentIndex]; //フード単種（ポチのポルトリー）がfoodに入る。

  //variantsはfood.variantsにある：ここで一番大きな容量の価格/kgを計算
  const largestVariant = food.variants.reduce((a,b)=>
  a.weight > b.weight ? a:b);
  const pricePerKg = Math.round(
    (largestVariant.price / largestVariant.weight) * 1000
  );

  const goNext = (e:React.MouseEvent) => {
    e.stopPropagation();
    const next = (currentIndex+1) % groupedFood.foods.length;
    //いまのindex+1を長さで割ったあまり
    //たとえば5種類あったとして、2番目を表示＝index1していたら
    //1+1 % 5 = 2 …つまり、一番最後の時だけあまりが「0」になる→nextがindex0になってループする
    setCurrentIndex(next);
  };

  const goPrev = (e:React.MouseEvent) =>{
    e.stopPropagation();
    const prev = (currentIndex-1 + groupedFood.foods.length) % groupedFood.foods.length;
    setCurrentIndex(prev);
  };

  //food.isHighProtein = food.nutrients.protein >= 29;

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="font-kosugi bg-white text-cardBaseFont rounded-2xl p-3 w-[300px] max-w-sm mx-auto
      flex flex-col min-h-[360px]
      transition transform hover:-translate-y-2 hover:shadow-lg group cursor-pointer"
      style={{
        boxShadow:
          "0 4px 8px rgba(0,0,0,0.1), 0 -4px 8px rgba(0,0,0,0.1)",
      }}
      onClick={() => setSelectedFood(food)}
    >

      {/* ブランド名共通部分 */}
        <div className="min-h-[3.5rem] flex flex-col justify-center items-center text-center mb-2">
            <h2
              className={`font-noto font-bold leading-snug ${
              groupedFood.name.length >= 15 ? "text-base" : "text-xl"
            }`}>
                {groupedFood.name}
            </h2>
            <p className="font-noto font-normal text-cardBaseFont_pale text-sm leading-none">
                {food.name_sub}
            </p>
        </div>
      
      {/* カルーセル */}
      {/*
      <Carousel foods={groupedFood.foods} />
      */}


      
      {/* 画像+スライド矢印 */}
      <div className="relative mb-2" style={{ backgroundColor: "#fff" }}>
        <img
          src={`/images/${food.imgsrc}.png`}
          alt={food.name_sub}
          className="rounded-md w-auto h-[160px] object-contain mx-auto transition-transform duration-300 group-hover:scale-105"
        />
      {groupedFood.foods.length > 1 &&(
        <>
          <button
            onClick={goPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-1"
            >◀</button>
          <button
            onClick={goNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-1"
          >▶</button>
        </>
      )}

        {/* 画像にコメントを重ねる場合
        <p className="absolute bottom-0 left-0 bg-white bg-opacity-80 text-xs px-2 py-1 rounded-tr-md w-full">
          {food.comment}
        </p>
        */}
      </div>

      {/* アイコン */}
      <FeatureIcons food={food} />

        <p className="bg-white border border-1 bg-opacity-80 text-xs
        border-cardBaseFont_pale text-cardBaseFont_pale p-2 my-3 rounded w-full h-auto">
          {food.comment}
        </p>

      {/* バリエーション表示（アコーディオン） */}
      <div className="flex flex-col justify-center contents-center h-full mb-2 mt-3">
      <ul className="text-sm text-cardBaseFont text-center space-y-1 relative">
        {/* variants 表示 */}
        <div
            className={`transition-all duration-300 overflow-hidden ${
            isExpanded ? "max-h-[1000px]" : "max-h-[2.5rem] relative"
            }`}
        >
            <ul>
            {food.variants.map((v, i) => (
                <li key={i}>
                {v.weight >= 1000
                    ? `${(v.weight / 1000).toFixed(1)}kg`
                    : `${v.weight}g`}{" "}
                ： {v.price.toLocaleString()}円
                <span className="text-xs text-cardBaseFont_palemore">
                  （{((v.price / v.weight)*1000).toFixed(0)}円/kg）
                </span>
                </li>
            ))}
            </ul>
        
            {/* フェードマスク */}
            {food.variants.length > 3 && !isExpanded && (
            <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
            )}
        
        </div>

        {/* See More ボタンとか。要素が3以上のときに表示 */}
        {food.variants.length > 2 && (
            <div
                onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
                }}
                className="flex justify-center cursor-pointer mt-2 select-none relative group/see"
            >
                {/* テキスト + ▼ */}
                <div className="flex items-center gap-1 text-xs text-cardBaseFont z-10
                group-hover/see:opacity-60 transition-opacity duration-200">
                <span>{isExpanded ? "See Less" : "See More"}</span>
                <span
                    className={`inline-block transition-transform duration-300 ${
                    isExpanded ? "rotate-180" : "rotate-0"
                    }`}
                >
                    ▼
                </span>
                </div>

                {/* アンダーライン（ホバー時だけ表示、テキストと▼の下にかかる） */}
                <div className="absolute bottom-0 w-[80px] h-[1px] bg-cardBaseFont opacity-0 group-hover/see:opacity-60 transition-opacity duration-200 pointer-events-none" />
            </div>
        )}
        {/*
        <li>
          <span className="text-xs text-cardBaseFont_palemore">
            {pricePerKg}円/kg
            {food.variants.length > 1 && "（最大パッケージの場合）"}
          </span>
        </li>
         */}
        <li>{food.kcal}kcal/100g</li>
      </ul>
      </div>

          {/* -------------うちのこ情報------------- */}

      {/*
      
      {shouldShowUserStatus(dailyGrams, pricePerDay, daysPerBag) && (
        <div className="bg-[#EFEFEF] rounded-md p-2 text-sm">
          <p className="flex items-center gap-1 font-bold text-teal-800">
            <img src="/images/icons/dogs/paw.png" className="w-5 h-5" />
            うちのこの場合
          </p>
          <p>
            1日：{dailyGrams}g / {pricePerDay}円
          </p>
          <p>消費：{daysPerBag}日で1袋
            <span className="text-xs">{food.variants.length > 1 && "（最大パッケージ）"}</span>
          </p>
        </div>
      )}

       */}

    </div>
  );
};

export default FoodCard;