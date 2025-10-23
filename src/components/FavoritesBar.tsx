// components/FavoritesBar.tsx
import React from "react";
import type { FoodWithGroup } from "@/types/types";

interface Props {
  favorites: FoodWithGroup[];
  toggleFavorite: (f: FoodWithGroup) => void;
  onCompareClick: () => void;
}

const FavoritesBar: React.FC<Props> = ({ favorites, toggleFavorite, onCompareClick }) => {
  if (favorites.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-60 p-3 flex items-center justify-between z-50">
      <div className="flex space-x-3 overflow-x-auto scrollbar-hide">

        {favorites.map((item) => (

            

          <button
            key={item.groupedFood.name}
            onClick={() => toggleFavorite(item)}
            className="shrink-0 w-12 h-12 bg-white rounded-md flex items-center justify-center overflow-hidden p-0 border-0 leading-none appearance-none"
            >
            <img
                src={`/images/${item.food.imgsrc}.png`}
                alt={item.groupedFood.name}
                className="max-w-full max-h-full object-contain bg-red-400" // ★ ← important!
            />
            </button>
        ))}
      </div>

      <button
        onClick={onCompareClick}
        className="ml-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded shadow"
      >
        比較
      </button>
    </div>
  );
};

export default FavoritesBar;