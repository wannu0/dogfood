// src/pages/HomePage.tsx
import type { FoodWithGroup, MyPet, NutrientFilter, NutrientRange, ViewMode ,GroupedFood,Nutrients, Stage} from '../types/types';
import FoodList from '../FoodList';

type Props = {
  groupedFoods:GroupedFood[];
  nutrientAvg:Nutrients;
  myPet: MyPet | undefined;
  stage: Stage;
  idealWeight: number | undefined;
  isOrganic: boolean;
  isDomestic: boolean;
  activeFood: FoodWithGroup | null;
  setActiveFood: (f:FoodWithGroup)=>void;
  viewMode: ViewMode;
  nutrientFilter: NutrientFilter;
  toggleFavorite:(f:FoodWithGroup)=>void;
  isFavorite:(f:FoodWithGroup)=>boolean;    
  favorites: FoodWithGroup[];
  setMyPet: (p: MyPet) => void;
  setViewMode: (v: ViewMode) => void;
  setNutrientFilter: (f: NutrientFilter) => void;
  nutrientRanges: NutrientRange;
};

export default function HomePage({
  groupedFoods, myPet, stage, idealWeight, isOrganic, isDomestic, activeFood, setActiveFood, 
  nutrientAvg, viewMode, nutrientFilter, toggleFavorite, isFavorite,
  favorites,
  setViewMode,
  setNutrientFilter,
  nutrientRanges
}: Props) {
  return (
    <div className="p-4">
      {/* サイドバーはApp側に置いてあるのでここはメインコンテンツ */}
      <FoodList
        groupedFoods={groupedFoods}
        nutrientAvg = {nutrientAvg}
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
        // 必要な propsを渡す
        favorites={favorites}
        setViewMode={setViewMode}
        myPet={myPet}
        setNutrientFilter={setNutrientFilter}
        nutrientRanges={nutrientRanges}
      />
    </div>
  );
}