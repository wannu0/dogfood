//calcNutrients.ts

import type { Food, Nutrients } from "../types";

export function calcNutrientAverages(foods:Food[]): Nutrients{
    const sum: Record<string, number> = {};
    const count: Record<string, number> = {};

    foods.forEach((f)=>{
        const nuts = f.nutrients;
        if(!nuts) return;
        for (const key in nuts){
            const val = nuts[key as keyof typeof nuts];
            if(typeof val === "number" && val > 0){
                sum[key] = (sum[key] || 0) + val;
                count[key] = (count[key] || 0) + 1;
            }
        }
    });

    const avg: Record<string, number> = {};
    for (const key in sum){
        avg[key] = sum[key] / (count[key] ?? 1);
    }
    return avg as Nutrients; // 例：{ protein: 25.3, fat: 8.7, ... }
}


export function calcNutrientMedians(foods: Food[]): Nutrients {
  const values: Record<string, number[]> = {};

  foods.forEach((f) => {
    const nuts = f.nutrients;
    if (!nuts) return;
    for (const key in nuts) {
      const val = nuts[key as keyof typeof nuts];
      if (typeof val === "number" && val > 0) {
        if (!values[key]) values[key] = [];
        values[key].push(val);
      }
    }
  });

  const medians: Record<string, number> = {};
  for (const key in values) {
    const sorted = values[key].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    if (sorted.length % 2 === 0) {
      medians[key] = (sorted[mid - 1] + sorted[mid]) / 2;
    } else {
      medians[key] = sorted[mid];
    }
  }

  return medians as Nutrients;
}