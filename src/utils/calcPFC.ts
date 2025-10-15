// utils/calcPFC.ts
import type { Food } from "../types/types";

export function calcPFC(
  food: Food,
  nutrientAvg?: Record<string, number>
): {
  pfc: Record<"protein" | "fat" | "carb", number>;
  note: string | null;
} {
  const n = food.nutrients ?? {};
  const ash = n.ash && n.ash > 0 ? n.ash : nutrientAvg?.ash;
  const water = n.water && n.water > 0 ? n.water : nutrientAvg?.water;

  let note: string | null = null;
  if ((!n.ash || n.ash === 0) && nutrientAvg?.ash !== undefined) {
    note = `灰分値不明のため平均値（${nutrientAvg.ash.toFixed(1)}%）を仮当てして計算`;
  }

  if ((!n.water || n.water === 0) && nutrientAvg?.water !== undefined) {
    note = note
      ? `${note}、水分値は平均値（${nutrientAvg.water.toFixed(1)}%）を使用`
      : `水分値不明のため平均値（${nutrientAvg.water.toFixed(1)}%）を仮当てして計算`;
  }

  if (ash === undefined || water === undefined) {
    return {
      pfc: { protein: 0, fat: 0, carb: 0 },
      note: null,
    };
  }

  const dryBasis = 100 - water - ash;
  const protein = ((n.protein ?? 0) / dryBasis) * 100;
  const fat = ((n.fat ?? 0) / dryBasis) * 100;
  const fiber = (n.fiber ?? 0);
  const carb = 100 - protein - fat - fiber;

  return {
    pfc: {
      protein: Math.round(protein),
      fat: Math.round(fat),
      carb: Math.round(carb),
    },
    note,
  };
}


/*
import type { Food } from "../types";

export function calcPFC(food: Food): { protein: number; fat: number; carb: number } {
  const p = food.nutrients?.protein ?? 0;
  const f = food.nutrients?.fat ?? 0;
  const a = food.nutrients?.ash || 0; //記載が無い=0の場合は8%
  const w = food.nutrients?.water || 0; //記載が無い=0の場合は10%
  const fiber = food.nutrients?.fiber ?? 0;

  const carbRaw = Math.max(100 - (p + f + a + w + fiber), 0);
  const dryMatter = 100 - w || 1; // 水分を除いた部分　変な値の時は1を入れてゼロにならないようにする

  // 乾物換算（DM Basis）
  const dryProtein = (p / dryMatter) * 100;
  const dryFat = (f / dryMatter) * 100;
  const dryCarb = (carbRaw / dryMatter) * 100;

  //繊維・灰分を含まず100%にする場合の分母
  const total = dryProtein + dryFat + dryCarb || 1;

  return {
    protein: Math.round(dryProtein),
    fat: Math.round(dryFat),
    carb: Math.round(dryCarb),
  };
}

*/

