import foods from "./data/foods.json";
import type { Stage, GroupedFood,Food,Nutrients,SelectedFood } from "./types";
import { calcDER } from "./utils/calories";
import FoodCard from "./components/FoodCard";

type Props = {
  //foods: GroupedFood[];
  groupedFoods:GroupedFood[];
  nutrientAvg:Nutrients;
  stage: Stage;
  idealWeight: number | undefined;
  isOrganic: boolean;
  isDomestic: boolean;
  selectedFood: SelectedFood | null;
  setSelectedFood: (f:SelectedFood)=>void;
};

const FoodList = ({ groupedFoods, stage, idealWeight, isOrganic, isDomestic, selectedFood, setSelectedFood }: Props) => {

  const showUserInfo = idealWeight ? idealWeight > 0 : false; //入力の有無を管理する
  const der = idealWeight ? calcDER(idealWeight, stage) : 0; //まず必要カロリーを計算
  //const foodsDisplay = isOrganic ? foods.filter((f) => f.isOrganic) : foods;

  //OrganicかつDomestic
  const filteredGroups = foods.filter((group)=>{
    const matchesOrganic = isOrganic ? group.foods.some((food)=>food.isOrganic) : true;
    const matchesDomestic = isDomestic ? group.foods.some((food)=>food.isDomestic):true;
    return matchesOrganic && matchesDomestic;
  });

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroups.map((group, index) => {

          //最大パッケージ------
          /*
          const largestVariant = food.variants.reduce((a, b) =>
            a.weight > b.weight ? a : b
          );
          const pricePerKg = Math.round((largestVariant.price / largestVariant.weight) * 1000);
          */
          //-----

          /*
          const dailyGrams = der > 0 ? Math.floor((der / food.kcal) * 100) : 0; //1日に必要なgを「必要kcal/フードkcal」で計算
          const daysPerBag =
            dailyGrams > 0 ? Math.floor(largestVariant.weight / dailyGrams) : undefined;
          const pricePerDay =
            daysPerBag && daysPerBag > 0 ? Math.floor(largestVariant.price / daysPerBag).toFixed(0) : undefined; //.toFixedで文字列に変換
          */

          return (
            <FoodCard 
              //key={index}
              key={group.id}
              groupedFood={group}
              //food={food}
              //dailyGrams={showUserInfo ? dailyGrams : undefined}
              //pricePerDay={showUserInfo ? pricePerDay : undefined}
              //daysPerBag={showUserInfo ? daysPerBag : undefined}
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

/**
 
  const showUserInfo = idealWeight ? idealWeight > 0 : false; //入力の有無を管理する
  const der = idealWeight ? calcDER(idealWeight, stage) : 0; //まず必要カロリーを計算
  const foodsDisplay = isOrganic ? foods.filter((f) => f.isOrganic) : foods;
  
  

  //return-------------------------------------
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {foodsDisplay.map((food, index) => {

          //最大パッケージ------
          const largestVariant = food.variants.reduce((a, b) =>
            a.weight > b.weight ? a : b
          );
          const pricePerKg = Math.round((largestVariant.price / largestVariant.weight) * 1000);
          //-----

          const dailyGrams = der > 0 ? Math.floor((der / food.kcal) * 100) : 0; //1日に必要なgを「必要kcal/フードkcal」で計算
          const daysPerBag =
            dailyGrams > 0 ? Math.floor(largestVariant.weight / dailyGrams) : undefined;
          const pricePerDay =
            daysPerBag && daysPerBag > 0 ? Math.floor(largestVariant.price / daysPerBag).toFixed(0) : undefined; //.toFixedで文字列に変換

          return (
            <FoodCard 
              key={index}
              food={food}
              dailyGrams={showUserInfo ? dailyGrams : undefined}
              pricePerDay={showUserInfo ? pricePerDay : undefined}
              daysPerBag={showUserInfo ? daysPerBag : undefined}
              selectedFood={selectedFood}
              setSelectedFood={setSelectedFood}
            />
          );
        })}
      </div>
    </div>
  );

 */