//FoodDetailModal.tsx

import { useEffect } from "react";
import type { Food, SelectedFood } from "../types";
import FeatureIcons from "./FeatureIcons";
import NutrientChart from "./NutrientChart";


type Props = {
  selectedFood: SelectedFood;
  onClose: () => void;  
  nutrientAvg: Record<string, number>;  //平均値オブジェクト
};

export default function FoodDetailModal({selectedFood,onClose,nutrientAvg}:Props){

    const food = selectedFood.food;
    const foodGroup = selectedFood.groupedFood;

    useEffect(()=>{
        const handleKeyDown = (e:KeyboardEvent) => {
            if(e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    },[onClose]);

    const nutrientLabels = {
        protein: "タンパク質",
        fat: "脂質",
        fiber: "繊維",
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
        <div className="fixed inset-0 flex items-center justify-center z-50 text-modalBaseFont">

            {/* 背景 */}
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
            
            {/* モーダル本体 */}
            <div className="bg-white p-6 rounded-xl w-full max-w-2xl relative shadow-lg">
                {/* 閉じるボタン */}
                <button onClick={onClose} className="absolute text-lg -top-10 -right-10 bg-white text-gray-700 rounded-full shadow-md w-8 h-8 flex items-center justify-center hover:bg-gray-100">
                    ✕
                </button>

                {/* モーダル内ラッパー */}
                <div className="flex flex-col">
                    {/* タイトル（最上部） */}
                    <div className="flex flex-col gap-1 pb-2 mb-1 border-b-2 border-borderBeige">
                        <h2 className="text-2xl font-bold text-center">{foodGroup.name}</h2>
                        {food.name_sub && (<p className="text-sm text-center">{food.name_sub}</p>)}
                    </div>

                    {/* 中央コンテンツ */}
                    {/* 中央ラッパー：横並び */}
                    <div className="flex flex-row w-full space-y-2">
                        {/* ひだりがわ：縦並び */}
                        <div className="flex flex-col w-2/5 items-center justify-center p-2">
                            <img src={`/images/${food.imgsrc}.png`} alt={foodGroup.name} className="w-[150px] m-4" />
                            <div><FeatureIcons food={food} /></div>
                            <div className="pt-3">
                            <ul className={food.variants.length < 3 ? "text-sm":"text-xs"}>
                            {food.variants.map((v, i) => (
                                <li key={i}>
                                    {v.weight >= 1000
                                    ? `${(v.weight / 1000).toFixed(1)}kg`
                                    : `${v.weight}g`} / {v.price.toLocaleString()}円
                                </li>
                            ))}
                            </ul>
                            </div>
                            
                        </div>
                        {/* みぎがわ：縦並び */}
                        <div className="flex flex-col flex-1 gap-2 p-2">
                            <div className="mb-1 text-sm">{food.comment}</div>
                            <div className="min-h-[200px] flex flex-col justify-center">
                            <NutrientChart nutrients={nutrientData} averages={nutrientAvg}/>
                            </div>
                            <div className="text-modalBaseFont_pale text-right text-sm mt-auto">
                                <span className="mr-5">{food.kcal || "-"}kcal / 100g</span>
                                <span>原産国：{food.country || "情報なし"}</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* 下部 */}
                    <div className="space-y-2 text-sm border border-borderBeige mt-2 p-2 rounded">
                        <p><strong>原材料</strong></p>
                        <div className="ml-3 mr-3 text-sm">{food.ingredients || "情報なし"}
                            {food.note && (
                                <div className="text-xs bg-mordalSubInfo p-2 mt-1">{food.note}</div>
                            )}
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}
