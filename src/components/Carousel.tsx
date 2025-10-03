//Carousel.tsx
import { useState, type FC } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Food } from "../types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FeatureIcons from "./FeatureIcons";

type Props = {
  foods: Food[];
};

const Carousel: FC<Props> = ({ foods }) => {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i)=>(i+1)%foods.length);
  const prev = () => setIndex((i)=>(i-1+foods.length)%foods.length);


  return (
    <div className="relative w-full h-[340px] flex flex-col items-center overflow-hidden">
      {/* スライド領域 */}
      <div className="relative w-full flex-1">
        {foods.map((food, i)=>{
          //スライド間隔を出すためのスタイル調整
          const offset = i- index;
          //左右に離れているスライドは透明度を下げたり縮小したり
          const isActive = i === index;

          return(
            <motion.div
              key={i}
              className="absolute top-0 h-full w-full"
              initial={{opacity:0, scale:0.8}}
              animate={{
                opacity: isActive ? 1:0.5,
                scale: isActive ? 1:0.8,
                x: `${(i-index)*100}%`,
              }}
              transition={{type:"spring", stiffness: 300, damping:30}}
              style={{width: "100%"}}
            >
              <div className="text-sm font-bold text-center">{food.name_sub}</div>
              <div className="mx-2 p-0 bg-white">
                <img
                  src = {`/images/${food.imgsrc}.png`}
                  alt={food.name_sub}
                  className="h-[160px] object-contain mx-auto mb-2"
                />
                <FeatureIcons food={food}/>
                <div className="border border-cardBaseFont_pale 
                  text-xs text-cardBaseFont_pale rounded-[3px] mt-4 p-2
                  h-[5rem]">
                  <div className="line-clamp-4 overflow-hidden">{food.comment}</div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

        {/* 左右やじるし */}
        {foods.length > 1 && (
          <div>
            <button
              onClick={prev}
              className="absolute left-0 top-1/3 -translate-y-1/2 p-2 text-gray-600 hover:text-black"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={next}
              className="absolute right-0 top-1/3 -translate-y-1/2 p-2 text-gray-600 hover:text-black"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            </div>
        )}
        

        {/* インジケーター */}
        {foods.length >1 && (
          <div className="mt-2 flex justify-center space-x-2">
          {foods.map((_, i)=>(
            <div 
              key={i}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === index ? "bg-gray-800" : "bg-gray-400"
              }`}
            />
          ))}

        </div>
        )}

        
    </div>    

  );
};

export default Carousel;