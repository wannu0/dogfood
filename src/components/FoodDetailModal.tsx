//FoodDetailModal.tsx

import { useEffect,useState } from "react";
import React from "react";
import { motion } from "framer-motion";
import type { Food, SelectedFood, GroupedFood } from "../types/types";
import { calcPFC } from "../utils/calcPFC";
import FeatureIcons from "./FeatureIcons";
import NutrientChart from "./NutrientChart";
import PFCChart from "./PFCChart";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FoodListModal from "./FoodListModal";


type Props = {
  selectedFood: SelectedFood;
  setSelectedFood: (f:SelectedFood)=>void;
  onClose: () => void;  
  nutrientAvg: Record<string, number>;  //平均値オブジェクト
  nutrientMedian: Record<string, number>;  //中央値オブジェクト
};

export default function FoodDetailModal({selectedFood,setSelectedFood, onClose,nutrientAvg,nutrientMedian}:Props){

    const foods = selectedFood.groupedFood.foods;
    const groupedFood = selectedFood.groupedFood;

    const initialIndex = foods.findIndex(f=>f.food_id === selectedFood.food.food_id);
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [isDetailMode, setIsDetailMode] = useState(foods.length === 1);   //1つなら即詳細表示

    const food = foods[currentIndex]//selectedFood.food;
    const foodGroup = selectedFood.groupedFood; //多分いらなくなる

    //const pfc = calcPFC(food);
    const { pfc, note: pfcNote } = calcPFC(food, nutrientAvg);

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

    const goNext = () => setCurrentIndex((i)=>(i+1)%foods.length);
    const goPrev = () => setCurrentIndex((i)=>(i-1+foods.length)%foods.length);


    return(
        <div className="fixed inset-0 flex items-center justify-center z-50 text-modalBaseFont">

                {/* 一覧モード */}
                {!isDetailMode ? (
                    <FoodListModal
                    foods={foods}
                    foodGroup={foodGroup}
                    onSelect={(food)=>{
                        //クリックされたfoodを受け取り、currentIndexを更新する
                        const index = foods.findIndex(f=>f.food_id === food.food_id);
                        if(index !== -1) setCurrentIndex(index);
                        setIsDetailMode(true)}}
                    onClose={onClose}
                    />
                ):(
                //詳細モード

                <div>
                    <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
            
                    <div className="bg-white p-6 rounded-xl w-full max-w-3xl relative shadow-lg">
                        {/* 閉じるボタン */}
                        <button onClick={onClose} className="absolute text-lg -top-10 -right-10 bg-white text-gray-700 rounded-full shadow-md w-8 h-8 flex items-center justify-center hover:bg-gray-100">
                            ✕
                        </button>
                        {/* ページャー */}
                        <div>
                        {foods.length > 1 && currentIndex > 0 && (
                            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-24 z-50 bg-opacity-0" onClick={goPrev} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") goPrev(); }}>
                                <ChevronLeft size={96} className="text-white" />
                            </div>
                        )}

                        {foods.length > 1 && currentIndex < foods.length - 1 && (
                            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-24 z-50 bg-opacity-0" onClick={goNext} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") goNext(); }}>
                            <ChevronRight size={96} className="text-white" />
                            </div>
                        )}
                        </div>


                        <div className="flex flex-col">
                            {/* タイトル（最上部） */}
                            <div className="flex flex-col gap-1 pb-2 mb-1 border-b-2 border-borderBeige">
                                <h2 className="text-2xl font-bold text-center">{foodGroup.name}</h2>
                                {food.name_sub && (<p className="text-sm text-center">{food.name_sub}</p>)}
                            </div>
                            {/* コメント：いったん非表示 */}
                            {/* 
                            <div className="mb-1 text-sm text-center w-11/12 mx-auto mt-2">{food.comment}</div>
                            */}

                            {/* 中央コンテンツ */}
                            {/* 中央ラッパー：横並び */}
                            <div className="flex flex-row w-full space-y-2">
                                {/* ひだりがわ：縦並び */}
                                <div className="flex flex-col w-2/5 items-center justify-center p-2">
                                    <img src={`/images/${food.imgsrc}.png`} alt={foodGroup.name} className="w-[150px] m-4" />
                                    <div><FeatureIcons food={food} /></div>
                                        <div className="pt-3 w-[80%]">
                                            <div className={`space-y-1 ${food.variants.length < 3 ? "text-xs" : "text-xs"}`}>
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
                                {/* みぎがわ：縦並び */}
                                <div className="flex flex-col flex-1 gap-2 p-2">
                                    {/*<div className="mb-1 text-sm">{food.comment}</div>*/}
                                    <PFCChart pfc={pfc} note={pfcNote} />
                                    <div className="min-h-[200px] flex flex-col justify-center">
                                    <NutrientChart nutrients={nutrientData} averages={nutrientAvg} medians={nutrientMedian}/>
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
                                <div className="ml-3 mr-3 text-xs">{food.ingredients || "情報なし"}
                                    {food.note && (
                                        <div className="text-xs bg-mordalSubInfo p-2 mt-1">{food.note}</div>
                                    )}
                                </div>
                            </div>

                            {/* 戻るボタン */}
                            {foods.length > 1 &&(
                                <div className="mt-4 text-center">
                                    <button 
                                    onClick={()=>setIsDetailMode(false)}
                                    className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 text-sm">
                                        ←他の情報も見る
                                    </button>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
                )}

     </div>            
            
    );
}

