// App.tsx
import groupedFoods from "./data/foods.json";
import {useState,useMemo, useEffect} from "react";
import FoodList from './FoodList'
import Sidebar from "./Sidebar";
import FoodDetailModal from "./components/FoodDetailModal";
import { calcNutrientAverages, calcNutrientMedians } from "./utils/calcNutrients";
import type { Stage, GroupedFood, Food, Nutrients, MyPet, ViewMode, FoodWithGroup, NutrientFilter, NutrientRange } from "./types/types";
//-------------------------------------------


//GroupedFood[]からすべてのFood[]を抽出
//const foods: GroupedFood[] = groupedFoods;
//すべてをallFoods配列に格納
//const allFoods: Food[] = foods.flatMap(group => group.foods);

// GroupedFood[] → Food[] に展開
const allFoods: Food[] = groupedFoods.flatMap((group) => group.foods);

// 栄養素のレンジ（min/max）を計算-food[]を受け取って、そのなかの最大・最小をNutrientRange型にセットして返す関数
const getNutrientRanges = (foods: Food[]): NutrientRange => {
  const values = {
    protein: foods.map((f) => f.nutrients?.protein ?? 0),
    fat: foods.map((f) => f.nutrients?.fat ?? 0),
    fiber: foods.map((f) => f.nutrients?.fiber ?? 0),
  };

  return {
    protein: { min: Math.min(...values.protein), max: Math.max(...values.protein) },
    fat: { min: Math.min(...values.fat), max: Math.max(...values.fat) },
    fiber: { min: Math.min(...values.fiber), max: Math.max(...values.fiber) },
  };
};

//平均値と中央値の計算
const nutrientAvg = calcNutrientAverages(allFoods)  as Nutrients;
const nutrientMedian = calcNutrientMedians(allFoods) as Nutrients;



//--------------------------------------------
export default function App() {

  //うちのこ情報
  const [myPet, setMyPet] = useState<MyPet | undefined>(undefined);
  //いらなくなるかも
  const [stage, setStage]=useState<Stage>("成犬_去勢済");
  const [idealWeight, setIdealWeight]=useState<number | undefined>(undefined);
  const [isOrganic, setIsOrganic]=useState(false);
  const [isDomestic, setIsDomestic]=useState(false);

  const [activeFood, setActiveFood] = useState<FoodWithGroup | null>(null);

  //絞り込みの設定----------
  const nutrientRanges = useMemo(() => getNutrientRanges(allFoods), []);
  //nutrientFilterにそれぞれの最小最大をセット（デフォルト）
  const [nutrientFilter, setNutrientFilter] = useState<NutrientFilter>({
    protein: [nutrientRanges.protein.min, nutrientRanges.protein.max],
    fat: [nutrientRanges.fat.min, nutrientRanges.fat.max],
    fiber: [nutrientRanges.fiber.min, nutrientRanges.fiber.max],
  });

  const [proteinRange, setProteinRange] = useState<[number, number]>([
  nutrientRanges.protein.min,
  nutrientRanges.protein.max,
  ]);
  const [fatRange, setFatRange] = useState<[number, number]>([
  nutrientRanges.fat.min,
  nutrientRanges.fat.max,
  ]);
  const [fiberRange, setFiberRange] = useState<[number, number]>([
  nutrientRanges.fiber.min,
  nutrientRanges.fiber.max,
  ]);

  //sliderの入力を反映する
  useEffect(() => {
  setNutrientFilter({
    protein: proteinRange,
    fat: fatRange,
    fiber: fiberRange,
  });
  }, [proteinRange, fatRange, fiberRange]);

  //リセット用デフォルトデータを計算
  const initialFilter: NutrientFilter = {
  protein: [nutrientRanges.protein.min, nutrientRanges.protein.max],
  fat: [nutrientRanges.fat.min, nutrientRanges.fat.max],
  fiber: [nutrientRanges.fiber.min, nutrientRanges.fiber.max],
  };

  //リセット用関数
  const resetFilters = () => {
  setNutrientFilter(initialFilter);
  setProteinRange(initialFilter.protein);
  setFatRange(initialFilter.fat);
  setFiberRange(initialFilter.fiber);
  // 他にも isOrganic など初期化したければここで
  };

  //グループ表示か個別表示か
  const [viewMode, setViewMode] = useState<ViewMode>("grouped");

  //お気に入りの登録
  const [favorites, setFavorites] = useState<FoodWithGroup[]>([]);

  //お気に入り登録・解除トグル関数
  const toggleFavorite = (food: FoodWithGroup) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.food.food_id === food.food.food_id);
      return exists
        ? prev.filter((f) => f.food.food_id !== food.food.food_id)
        : [...prev, food];
    });
  };

  //お気に入りかどうか返す関数
  const isFavorite = (food: FoodWithGroup) =>
  favorites.some((f) => f.food.food_id === food.food.food_id);


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
      nutrientFilter={nutrientFilter}
      setNutrientFilter={setNutrientFilter}
      nutrientRanges={nutrientRanges}
      proteinRange={proteinRange}
      setProteinRange={setProteinRange}
      fatRange={fatRange}
      setFatRange={setFatRange}
      fiberRange={fiberRange}
      setFiberRange={setFiberRange}
      resetFilters={resetFilters}
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
      nutrientFilter={nutrientFilter}
      toggleFavorite={toggleFavorite}
      isFavorite={isFavorite}
      />
    </div>
    </div>

  )
}
