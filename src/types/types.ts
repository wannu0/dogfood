// types.ts

export type Stage =
  | "成犬_去勢済"
  | "成犬_未去勢"
  | "シニア犬"
  | "子犬_4ヶ月未満"
  | "子犬_4〜9ヶ月"
  | "子犬_9〜12ヶ月";
  
export type Variant = {
  weight: number; // g
  price: number;  // 円
};

export type ViewMode = "grouped" | "flat" | "brand" | "search";

//成分ごとの情報
export type Nutrient = {
    key: string;     // ← 新規追加（"protein" など）
    name: string; //タンパク質など
    value:number;
    unit?:string;
    threshold?:number;
    thresholdLabel?:string;
    compare?:"above"|"below";
};

//フードに含まれる成分の情報　※たぶん使ってない
export type Nutrients = {
  protein: number;
  fat: number;
  fiber:number;
  ash:number;
  water:number;
};

//平均値の情報
export type NutrientAverage = {
  protein: number;
  fat: number;
  fiber: number;
  ash: number;
  water: number;
};

export type MyPet = {
  weightKg: number;
  stage: Stage;
};

//フードごとの情報（味）
export type Food = {
  name_sub : string;
  food_id : string;
  imgsrc:string;
  comment:string;
  kcal:number;
  isOrganic:boolean;
  isGrainFree:boolean;
  ingredients:string;
  note:string;
  country:string;
  nutrients:Nutrients;
  nutrients_sub:string;
  variants:Variant[]; //量のバリエーション（小袋〜大袋）
  isDomestic:boolean;
};

//フードブランドごとのセット
export type GroupedFood = {
  id:number;
  name:string;
  foods: Food[];
};

//モーダルにわたす情報
export type SelectedFood = {
  food: Food;
  groupedFood: GroupedFood;
}


/*
export type Food = {
  name: string;
  name_sub?: string;
  comment?: string;
  imgsrc: string;
  kcal: number;
  ingredients?: string;
  country?: string;
  isOrganic: boolean;
  isGrainFree: boolean;
  isHighProtein?: boolean;
  isDomestic: boolean;
  nutrients: {
    protein: number;
    fat: number;
    fiber: number;
    ash: number;
    water: number;
  };
  note?: string;
  variants: Variant[];
};
*/

