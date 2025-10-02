import { useState, type FC } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Food } from "../types";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  foods: Food[];
};

const Carousel: FC<Props> = ({ foods }) => {
  const [index, setIndex] = useState(0);

  const handleNext = () =>{
    setIndex((prev)=> (prev+1)%foods.length);
  };

  const handlePrev = () =>{
    setIndex((prev)=> (prev-1+foods.length)%foods.length);
  };

 


  return (
    <div className="relative w-full max-w-[300px] mx-auto overflow-hidden">
      <div className="flex justify-between absolute top-1/2 left-0 right-0 -translate-y-1/2 px-2 z-10">
      <button onClick={(e)=>{e.stopPropagation(); handlePrev();}}>
        <ChevronLeft className="w-6 h-6 text-gray-500 hover:text-black" />
      </button>
      <button onClick={(e)=>{e.stopPropagation(); handleNext();}}>
        <ChevronRight className="w-6 h-6 text-gray-500 hover:text-black" />
      </button>
      </div>

      <div className="flex transition-transform duration-500 ease-in-out"
      style={{transform : `translateX(-${index*100}%)`,width:`${foods.length*100}%`}}>
        {foods.map((food, i) => (
          <div
            key={i}
            className="w-full flex-shrink-0 px-4"
            style={{width:"100%", flex:"0 0 100%"}}
          >
            <div className="bg-gray-100 rounded-xl p-4 text-sm h-40 shadow">
            <p className="font-bold">{food.name_sub || "バリエーション"}</p>
            <p className="text-xs mt-1 text-gray-600">{food.comment}</p>
            </div>
          </div>
        ))}
      </div>

      {/* インジケーター */}
      <div className="flex justify-center mt-2 gap-1">
        {foods.map((_, i) =>(
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${i===index ? "bg-black":"bg-gray-300"}`}
          />
        ))}

      </div>
    </div>    

  );
};

export default Carousel;