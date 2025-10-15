//utils/calories.ts
import type { Stage } from "../types/types";

//理想体重からRERを計算
export function calcRER(weightKg:number):number{
    return 70 * Math.pow(weightKg,0.75);
}

//ステージに合わせて係数を返す
export function getCoefficient(stage:Stage):number{
    switch (stage){
        case "成犬_未去勢":
            return 1.8;
        case "成犬_去勢済":
            return 1.6;
        case "シニア犬":
            return 1.4;
        case "子犬_4〜9ヶ月":
            return 3;
        case "子犬_4ヶ月未満":
            return 2.5;
        case "子犬_9〜12ヶ月":
            return 2;
        default:
            return 1.6;
    }
}

export function calcDER(weightKg: number, stage: Stage):number {
    const rer = calcRER(weightKg);
    const coef = getCoefficient(stage);
    return rer * coef;
}