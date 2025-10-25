// src/pages/ComparePage.tsx
import React from 'react';
import type { FoodWithGroup } from '../types/types';
import FoodCompareInfo from '@/components/FoodCompareInfo';


type Props = {
  favorites: FoodWithGroup[];
  toggleFavorite: (f: FoodWithGroup) => void;
  onClose: () => void;
  nutrientAvg: Record<string, number>;  //平均値オブジェクト
  nutrientMedian: Record<string, number>;  //中央値オブジェクト
};

export default function ComparePage({ favorites, toggleFavorite, onClose, nutrientAvg, nutrientMedian }: Props) {
  //お気に入りに1件も登録されていない場合
  if (favorites.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <p className="text-gray-600">お気に入りが登録されていません。</p>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
          戻る
        </button>
      </div>
    );
  }

  // 事前処理
  const hasNameSub = favorites.some(item => item.food.name_sub);
  const maxVariantsLength = Math.max(...favorites.map(item => item.food.variants.length));
  console.log(maxVariantsLength);

  return (

    <div className="min-h-screen p-4 bg-gray-50">
      <button onClick={onClose} className="mb-4 px-3 py-1 bg-gray-200 text-gray-700 rounded">
        ← 一覧に戻る
      </button>

      <div className="overflow-x-auto">
        <div className="flex items-stretch space-x-0">
          {favorites.map(item => (
            <div key={item.food.food_id} className="flex flex-col bg-white shadow p-4 w-[350px] flex-shrink-0">

              <div className={`${hasNameSub ? "min-h-[60px]" : "min-h-[40px]"} bg-white`}>
                <h3 className="font-bold text-lg h-[30px] text-center">{item.groupedFood.name}</h3>
                {item.food.name_sub && (
                  <p className="text-sm text-gray-800 text-center mb-3">{item.food.name_sub}</p>
                )}
              </div>

              <img
                src={`/images/${item.food.imgsrc}.png`}
                alt={item.groupedFood.name}
                className="w-full h-40 object-contain mb-4"
              />

              <FoodCompareInfo
              activeFood={item}
              nutrientAvg={nutrientAvg}
              nutrientMedian={nutrientMedian}
              maxVariantsLength={maxVariantsLength}
              />

              <div className="mt-3 text-sm">
                <p>100gあたり: {item.food.kcal} kcal</p>
                <p>原産国：{item.food.country || '情報なし'}</p>
              </div>


            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}