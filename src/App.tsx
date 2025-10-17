// App.tsx
import groupedFoods from "./data/foods.json";
import {useState} from "react";
import FoodList from './FoodList'
import Sidebar from "./Sidebar";
import FoodDetailModal from "./components/FoodDetailModal";
import { calcNutrientAverages, calcNutrientMedians } from "./utils/calcNutrients";
import type { Stage, GroupedFood, Food, Nutrients, SelectedFood, MyPet, ViewMode, FoodWithGroup } from "./types/types";

//GroupedFood[]からすべてのFood[]を抽出
const foods: GroupedFood[] = groupedFoods;
//すべてをallFoods配列に格納
const allFoods: Food[] = foods.flatMap(group => group.foods);
//平均値と中央値の計算
const nutrientAvg = calcNutrientAverages(allFoods)  as Nutrients;
const nutrientMedian = calcNutrientMedians(allFoods) as Nutrients;

export default function App() {
  //うちのこ情報
  const [myPet, setMyPet] = useState<MyPet | undefined>(undefined);
  //いらなくなるかも
  const [stage, setStage]=useState<Stage>("成犬_去勢済");
  const [idealWeight, setIdealWeight]=useState<number | undefined>(undefined);
  const [isOrganic, setIsOrganic]=useState(false);
  const [isDomestic, setIsDomestic]=useState(false);

  const [activeFood, setActiveFood] = useState<FoodWithGroup | null>(null);
  //グループ表示か個別表示か
  const [viewMode, setViewMode] = useState<ViewMode>("grouped");


  return (
    <div className="flex min-h-screen">
    {/* サイドバー */}
    
      <Sidebar
      myPet={myPet}
      setMyPet={setMyPet}
      isOrganic={isOrganic}
      setIsOrganic={setIsOrganic}
      viewMode={viewMode}
      setViewMode={setViewMode}
      />
     

    {/* モーダル */}
    {activeFood && (
      <FoodDetailModal
      activeFood={activeFood}
      setActiveFood={setActiveFood}
      onClose={()=> setActiveFood(null)}
      nutrientAvg = {nutrientAvg}
      nutrientMedian={nutrientMedian}
      viewMode={viewMode}
      />
    )}

    {/* メインコンテンツ */}
    <div className="p-4 space-y-8">
      <h1 className="text-2xl font-bold text-center">ドッグフード計算アプリ 🐶</h1>

      <FoodList
      groupedFoods={groupedFoods}
      nutrientAvg = {nutrientAvg}
      myPet = {myPet}
      stage={stage}
      idealWeight={idealWeight}
      isOrganic={isOrganic}
      isDomestic={isDomestic}
      activeFood={activeFood}
      setActiveFood={setActiveFood}
      viewMode={viewMode}
      />
    </div>
    </div>

  )
}
