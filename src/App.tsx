// App.tsx
import groupedFoods from "./data/foods.json";
import {useState} from "react";
import FoodList from './FoodList'
import Sidebar from "./Sidebar";
import FoodDetailModal from "./components/FoodDetailModal";
import { calcNutrientAverages } from "./utils/calcNutrients";
import type { Stage, GroupedFood, Food, Nutrients } from "./types";

//GroupedFood[]からすべてのFood[]を抽出
const foods: GroupedFood[] = groupedFoods;
//すべてをallFoods配列に格納
const allFoods: Food[] = foods.flatMap(group => group.foods);
//平均値の計算
const nutrientAvg = calcNutrientAverages(allFoods)  as Nutrients;

export default function App() {
  const [stage, setStage]=useState<Stage>("成犬_去勢済");
  const [idealWeight, setIdealWeight]=useState<number | undefined>(undefined);
  const [isOrganic, setIsOrganic]=useState(false);
  const [isDomestic, setIsDomestic]=useState(false);

  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  //const nutrientAvg = calcNutrientAverages(foods);  //平均値を計算

  return (
    <div className="flex min-h-screen">
    {/* サイドバー */}
    {/*
      <Sidebar
      stage={stage}
      setStage={setStage}
      idealWeight={idealWeight}
      setIdealWeight={setIdealWeight}
      isOrganic={isOrganic}
      setIsOrganic={setIsOrganic}
      />
     */}

    {/* モーダル */}
    {selectedFood && (
      <FoodDetailModal
      food={selectedFood}
      onClose={()=> setSelectedFood(null)}
      nutrientAvg = {nutrientAvg}
      />
    )}

    {/* メインコンテンツ */}
    <div className="p-4 space-y-8">
      <h1 className="text-2xl font-bold text-center">ドッグフード計算アプリ 🐶</h1>

      <FoodList
      groupedFoods={groupedFoods}
      nutrientAvg = {nutrientAvg}
      stage={stage}
      idealWeight={idealWeight}
      isOrganic={isOrganic}
      isDomestic={isDomestic}
      selectedFood={selectedFood}
      setSelectedFood= {setSelectedFood}
      />
    </div>
    </div>

  )
}
