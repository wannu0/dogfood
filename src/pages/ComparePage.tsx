// src/pages/ComparePage.tsx
import React from 'react';
import type { FoodWithGroup } from '../types/types';

type Props = {
  favorites: FoodWithGroup[];
  toggleFavorite: (f: FoodWithGroup) => void;
  onClose: () => void;
};

export default function ComparePage({ favorites, toggleFavorite, onClose }: Props) {
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

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <button onClick={onClose} className="mb-4 px-3 py-1 bg-gray-200 text-gray-700 rounded">
        ← 一覧に戻る
      </button>

      <div className="overflow-x-auto">
        <div className="inline-flex space-x-6">
          {favorites.map(item => (
            <div key={item.food.food_id} className="bg-white rounded-lg shadow p-4 w-[280px] flex-shrink-0">
              <img
                src={`/images/${item.food.imgsrc}.png`}
                alt={item.groupedFood.name}
                className="w-full h-40 object-contain mb-4"
              />
              <h3 className="font-bold text-lg">{item.groupedFood.name}</h3>
              {item.food.name_sub && (
                <p className="text-sm text-gray-500">{item.food.name_sub}</p>
              )}
              <div className="mt-3 text-sm">
                <p>タンパク質: {item.food.nutrients?.protein}%</p>
                <p>脂質: {item.food.nutrients?.fat}%</p>
                <p>粗繊維: {item.food.nutrients?.fiber}%</p>
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