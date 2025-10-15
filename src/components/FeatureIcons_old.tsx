import type { Food } from "../types/types";

type Props = {
    food:Food;
};

export default function FeatureIcons({food}:Props){

const icons = [
        { src: "/images/options/organic.png", alt: "オーガニック", active: food.isOrganic, color:"#4daf9f" },
        { src: "/images/options/grainfree.png", alt: "グレインフリー", active: food.isGrainFree, color:"#ebc138" },
        { src: "/images/options/protein.png", alt: "高タンパク", active: food.isHighProtein, color:"#d8b09e" },
        { src: "/images/options/domestic.png", alt: "国産", active: food.isDomestic, color:"#e96d60" },
     ];

    return(
            <div className="flex justify-center gap-2 mt-2">
            {icons.map((icon, i) => (
                <div
                    key={i}
                    title={icon.alt}
                    className={`w-7 h-7 flex items-center justify-center rounded-full shadow-sm
                    ${icon.active ? "opacity-100" : "opacity-40 grayscale"}`}
                    style={{
                    backgroundColor: icon.active ? icon.color : "#ccc",
                    }}
                >
                    <img src={icon.src} alt={icon.alt} className="w-7 h-7" />
                </div>
            ))}
            </div>

    );
}