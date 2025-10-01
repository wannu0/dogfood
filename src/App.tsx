// App.tsx
import foods from "./data/foods_new.json";
import {useState} from "react";
import FoodList from './FoodList'
import Sidebar from "./Sidebar";
import FoodDetailModal from "./components/FoodDetailModal";
import { calcNutrientAverages } from "./utils/calcNutrients";
import type { Stage } from "./types";
import type { Food } from "./types";

export default function App() {
  const [stage, setStage]=useState<Stage>("成犬_去勢済");
  const [idealWeight, setIdealWeight]=useState<number | undefined>(undefined);
  const [isOrganic, setIsOrganic]=useState(false);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const nutrientAvg = calcNutrientAverages(foods);  //平均値を計算

  return (
    <div className="flex min-h-screen">
    {/* サイドバー */}
      <Sidebar
      stage={stage}
      setStage={setStage}
      idealWeight={idealWeight}
      setIdealWeight={setIdealWeight}
      isOrganic={isOrganic}
      setIsOrganic={setIsOrganic}
      />

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
      stage={stage}
      idealWeight={idealWeight}
      isOrganic={isOrganic}
      selectedFood={selectedFood}
      setSelectedFood= {setSelectedFood}
      />
    </div>
    </div>

  )
}
