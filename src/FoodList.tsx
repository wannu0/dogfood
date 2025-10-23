//FoodList.tsx
import type { Stage, GroupedFood,Food,Nutrients, FoodWithGroup, MyPet,ViewMode,NutrientFilter,NutrientRange } from "./types/types";
import { calcDER } from "./utils/calories";
import FoodCard from "./components/FoodCard";
import { useMemo } from "react";

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
};

const FoodList = ({ groupedFoods, myPet, stage, idealWeight, isOrganic, isDomestic, activeFood, setActiveFood, 
  viewMode, nutrientFilter, toggleFavorite, isFavorite }: Props) => {

  const showUserInfo = myPet?.weightKg ? myPet.weightKg > 0 : false; //入力の有無を管理する
  const der = idealWeight ? calcDER(idealWeight, stage) : 0; //まず必要カロリーを計算
  //const foodsDisplay = isOrganic ? foods.filter((f) => f.isOrganic) : foods;

  //すべてのfoodにgroup情報をもたせた構造…個別表示に使用する 
  const allFoods: FoodWithGroup[] = useMemo(() => {
    return groupedFoods.flatMap(group =>
      group.foods.map(food => ({
        food,
        groupedFood: group,
      }))
    );
  }, [groupedFoods]);

  //フィルター処理
  const filteredFoods = useMemo(()=>{
    return allFoods.filter(({food})=>{
      const n = food.nutrients;
      if(!n) return false;

      return(
        n.protein >= nutrientFilter.protein[0] && n.protein <= nutrientFilter.protein[1] &&
        n.fat >= nutrientFilter.fat[0] && n.fat <= nutrientFilter.fat[1] &&
        n.fiber >= nutrientFilter.fiber[0] && n.fiber <= nutrientFilter.fiber[1]
      );
    });
  },[allFoods, nutrientFilter]);
  

  //OrganicかつDomestic
  const filteredGroups = groupedFoods.filter((group)=>{
    const matchesOrganic = isOrganic ? group.foods.some((food)=>food.isOrganic) : true;
    const matchesDomestic = isDomestic ? group.foods.some((food)=>food.isDomestic):true;
    return matchesOrganic && matchesDomestic;
  });

  //絞り込みの対象が無い場合
  if (viewMode === "flat" && filteredFoods.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500 text-sm italic">
      😢 条件に合うフードがありませんでした。
      <br />
      フィルターを緩めて、再度お試しください。
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        {viewMode === "grouped"
          ? filteredGroups.map((group) => (
            
              <FoodCard
                key={group.id}
                foodWithGroup={{food: group.foods[0], groupedFood:group}}
                myPet={myPet}
                activeFood={activeFood}
                setActiveFood={setActiveFood}
                viewMode={viewMode}
                toggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
              />
 

            ))
          : filteredFoods.map((sf) => (
              <FoodCard
                key={sf.food.food_id}
                foodWithGroup={sf}
                myPet={myPet}
                activeFood={activeFood}
                setActiveFood={setActiveFood}
                viewMode={viewMode}
                toggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
              />
            ))}
      </div>
    </div>
  );
}

export default FoodList;
