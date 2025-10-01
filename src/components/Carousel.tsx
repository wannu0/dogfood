import type { FC } from "react";
import type { Food } from "../types";

type Props = {
  foods: Food[];
};

const Carousel: FC<Props> = ({ foods }) => {
  return (
    <div className="flex overflow-x-auto gap-4">
      {foods.map((food, index) => (
        <div
          key={index}
          className="flex-shrink-0 w-60 h-40 bg-gray-100 rounded-md p-2 text-sm"
        >
          <p className="font-bold">{food.name_sub || "バリエーション"}</p>
          <p>{food.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default Carousel;