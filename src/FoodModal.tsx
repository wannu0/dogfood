//FoodModal.tsx

import type { Food } from "./types";

type Props = {
    food: Food;
    onClose: () => void;
};

export default function FoodModal({food, onClose}: Props){
    return(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-whilte rounded-xl p-6 w-full max-w-lg relative">
                <button
                 onClick={onClose}
                 className="absolute top-2 right-2 text-gray-500 hover:text^black">✕</button>
                 <h2 className="text-xl" font-bold mb-2>{food.name}</h2>
                 <img src={`/images/${food.imgsrc}`} alt={food.name} className="mb-4" />
                 <p>情報を追加</p>
            </div>
        </div>
    );
}

