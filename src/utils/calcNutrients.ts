import type { Food } from "../types";

export function calcNutrientAverages(foods:Food[]){
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
    return avg; // 例：{ protein: 25.3, fat: 8.7, ... }
}
