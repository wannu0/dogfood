import type { Food } from "../types/types";

type Props = {
    food:Food;
};

export default function FeatureIcons({food}:Props){

const icons = [
        { src: "/images/options/organic2.png", alt: "オーガニック", active: food.isOrganic, color:"#4daf9f" },
        { src: "/images/options/grainfree2.png", alt: "グレインフリー", active: food.isGrainFree, color:"#ebc138" },
     ];

    return(
            <div className="flex justify-center gap-x-6 mt-3">
            {icons.map((icon, i) => (
                <div
                    key={i}
                    title={icon.alt}
                    className={`w-20 h-auto flex items-center justify-center rounded-full shadow-sm
                    ${icon.active ? "opacity-100" : "opacity-40 grayscale"}`}
                    style={{
                    backgroundColor: icon.active ? icon.color : "#ccc",
                    }}
                >
                    <img src={icon.src} alt={icon.alt} className="w-20 h-auto" />
                </div>
            ))}
            </div>

    );
}