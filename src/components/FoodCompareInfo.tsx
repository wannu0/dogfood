//FoodCompareInfo.tsx

import { useEffect,useState } from "react";
import type { FoodWithGroup} from "../types/types";
import { calcPFC } from "../utils/calcPFC";
import FeatureIcons from "./FeatureIcons";
import NutrientChart from "./NutrientChart";
import PFCChart from "./PFCChart";
import FoodListModal from "./FoodListModal";


type Props = {
  activeFood: FoodWithGroup;
  nutrientAvg: Record<string, number>;  //平均値オブジェクト
  nutrientMedian: Record<string, number>;  //中央値オブジェクト
};


export default function FoodDetailModal({activeFood,nutrientAvg,nutrientMedian}:Props){

    const foods = activeFood.groupedFood.foods;

    const initialIndex = foods.findIndex(f=>f.food_id === activeFood.food.food_id);
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    const food = foods[currentIndex]//selectedFood.food;
    const foodGroup = activeFood.groupedFood; //多分いらなくなる

    //const pfc = calcPFC(food);
    const { pfc, note: pfcNote } = calcPFC(food, nutrientAvg);

    const nutrientLabels = {
        protein: "タンパク質",
        fat: "脂質",
        fiber: "粗繊維",
        ash: "灰分",
        water: "水分"
    };

    {/* 基準値 ※仮！！ */}
    const thresholds = {
        protein : {value :20, compare : "above"},
        fat : {value :10, compare : "above"},
        fiber : {value :4.75, compare : "above"},
        ash : {value :9.5, compare : "below"},
        water : {value :9, compare : "below"}
    };

    {/* なにやってるか謎 */}
    const nutrientData = Object.entries(food.nutrients || {}).map(([key, value])=>({
        key,  // ←英語のキー
        name: nutrientLabels[key as keyof typeof nutrientLabels] || key, // 表示用（"タンパク質"とか。日本語）
        value,
        unit:"%",
        threshold:thresholds[key as keyof typeof thresholds]?.value ?? 0,
        thresholdLabel: thresholds[key as keyof typeof thresholds]?.compare === "above" ? "以上" : "以下",
        compare: (thresholds[key as keyof typeof thresholds]?.compare ?? "above") as | "above" | "below",
    }));



    return(
        <div className="text-modalBaseFont">

            {/* 保証分析値 */}
            <div className="min-h-[200px] flex flex-col justify-center">
                <div className="text-sm"><strong>保証分析値</strong></div>
                {/*
                <NutrientChart nutrients={nutrientData} averages={nutrientAvg} medians={nutrientMedian}/>
                */}
                <div className="text-center bg-gray-200">
                    <div>{food.nutrients.protein}</div>
                    <div>{food.nutrients.fat}</div>
                    <div>{food.nutrients.fiber}</div>
                    <div>{food.nutrients.ash}</div>
                    <div>{food.nutrients.water}</div>
                </div>
            </div>
            
            <div>
                <div className="text-sm"><strong>乾物基準</strong></div>
                <PFCChart pfc={pfc} note={pfcNote} />
                
            </div>

            {/* パッケー樹 */}
            <div>
                <div className="text-sm"><strong>パッケージ</strong></div>
                <div className="text-sm bg-green-300">
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
            
    );
}
