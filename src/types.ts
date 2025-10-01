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

export type Nutrient = {
    key: string;     // ← 新規追加（"protein" など）
    name: string; //タンパク質など
    value:number;
    unit?:string;
    threshold?:number;
    thresholdLabel?:string;
    compare?:"above"|"below";
};
