//FoodList.tsx
import foods from "./data/foods.json";
import type { Stage, GroupedFood,Food,Nutrients,SelectedFood, MyPet,ViewMode } from "./types/types";
import { calcDER } from "./utils/calories";
import FoodCard from "./components/FoodCard";
import { useMemo } from "react";

type Props = {
  //foods: GroupedFood[];
  groupedFoods:GroupedFood[];
  nutrientAvg:Nutrients;
  myPet: MyPet | undefined;
  stage: Stage;
  idealWeight: number | undefined;
  isOrganic: boolean;
  isDomestic: boolean;
  selectedFood: SelectedFood | null;
  setSelectedFood: (f:SelectedFood)=>void;
  viewMode: ViewMode;
};

const FoodList = ({ groupedFoods, myPet, stage, idealWeight, isOrganic, isDomestic, selectedFood, setSelectedFood, viewMode }: Props) => {

  const showUserInfo = myPet?.weightKg ? myPet.weightKg > 0 : false; //入力の有無を管理する
  const der = idealWeight ? calcDER(idealWeight, stage) : 0; //まず必要カロリーを計算
  //const foodsDisplay = isOrganic ? foods.filter((f) => f.isOrganic) : foods;

const allFoods: SelectedFood[] = useMemo(() => {
    return groupedFoods.flatMap(group =>
      group.foods.map(food => ({
        food,
        groupedFood: group,
      }))
    );
  }, [groupedFoods]);

  //OrganicかつDomestic
  const filteredGroups = foods.filter((group)=>{
    const matchesOrganic = isOrganic ? group.foods.some((food)=>food.isOrganic) : true;
    const matchesDomestic = isDomestic ? group.foods.some((food)=>food.isDomestic):true;
    return matchesOrganic && matchesDomestic;
  });

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

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

      </div>
    </div>
  );
}

export default FoodList;
