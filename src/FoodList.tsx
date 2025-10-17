//FoodList.tsx
import type { Stage, GroupedFood,Food,Nutrients,SelectedFood, FoodWithGroup, MyPet,ViewMode } from "./types/types";
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
};

const FoodList = ({ groupedFoods, myPet, stage, idealWeight, isOrganic, isDomestic, activeFood, setActiveFood, viewMode }: Props) => {

  const showUserInfo = myPet?.weightKg ? myPet.weightKg > 0 : false; //入力の有無を管理する
  const der = idealWeight ? calcDER(idealWeight, stage) : 0; //まず必要カロリーを計算
  //const foodsDisplay = isOrganic ? foods.filter((f) => f.isOrganic) : foods;

const allFoods: FoodWithGroup[] = useMemo(() => {
    return groupedFoods.flatMap(group =>
      group.foods.map(food => ({
        food,
        groupedFood: group,
      }))
    );
  }, [groupedFoods]);

  //OrganicかつDomestic
  const filteredGroups = groupedFoods.filter((group)=>{
    const matchesOrganic = isOrganic ? group.foods.some((food)=>food.isOrganic) : true;
    const matchesDomestic = isDomestic ? group.foods.some((food)=>food.isDomestic):true;
    return matchesOrganic && matchesDomestic;
  });

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
              />
 

            ))
          : allFoods.map((sf) => (
              <FoodCard
                key={sf.food.food_id}
                foodWithGroup={sf}
                myPet={myPet}
                activeFood={activeFood}
                setActiveFood={setActiveFood}
                viewMode={viewMode}
              />
            ))}


{/* 
        {filteredGroups.map((group, index) => {

          return (
            <FoodCard 
              //key={index}
              key={group.id}
              groupedFood={group}
              myPet={myPet}
              selectedFood={selectedFood}
              setSelectedFood={setSelectedFood}
            />
          );
        })}
*/}
      </div>
    </div>
  );
}

export default FoodList;
