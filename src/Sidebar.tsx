//Sidebar.tsx

import type { Stage,MyPet,ViewMode,NutrientFilter,NutrientRange } from "./types/types";
import { DualRangeSlider } from "@/components/ui/DualRangeSlider";

type Props = {
    myPet: MyPet | undefined;
    setMyPet:(p:MyPet)=>void;
    isOrganic: boolean;
    setIsOrganic: (o: boolean) => void;
    viewMode: ViewMode;
    setViewMode:(v:ViewMode)=>void;
    nutrientFilter:NutrientFilter;
    setNutrientFilter: (f: NutrientFilter)=>void;
    nutrientRanges: NutrientRange;
    //フィルター状態と関数を追加
    proteinRange: [number, number];
    setProteinRange: (range: [number, number]) => void;
    fatRange: [number, number];
    setFatRange: (range: [number, number]) => void;
    fiberRange: [number, number];
    setFiberRange: (range: [number, number]) => void;
};

export default function Sidebar({ myPet, setMyPet, isOrganic, setIsOrganic, viewMode, setViewMode, nutrientFilter,
     setNutrientFilter, nutrientRanges, proteinRange, setProteinRange, fatRange, setFatRange, fiberRange, setFiberRange }: Props){
    //なにかの値を更新している？
    const handleChange = (key: keyof NutrientFilter, index:0 | 1, value: number)=>{
        const updated = {...nutrientFilter};
        updated[key][index] = value;
        setNutrientFilter(updated);
    };

    const handleStageChange = (e:React.ChangeEvent<HTMLSelectElement>)=>{
        setMyPet({
            weightKg: myPet?.weightKg ?? 0,
            stage: e.target.value as Stage,
        });
    };

    const handleWeightChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setMyPet({
            weightKg: Number(e.target.value),
            stage: myPet?.stage ?? "成犬_去勢済", // デフォルト値
        });
    };

    //========== return ===========
    return(
        <aside className="bg-[#D0E1E8] text-[#193F5F] w-full max-w-xs p-6 space-y-6 shadow-md">

            <section>
                {/* ビューモード切替 */}
                <div className="flex flex-col gap-2 mt-4">
                <button
                    onClick={() => setViewMode("grouped")}
                    className={`px-3 py-1 rounded ${viewMode === "grouped" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                >
                    グループで表示
                </button>
                <button
                    onClick={() => setViewMode("flat")}
                    className={`px-3 py-1 rounded ${viewMode === "flat" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                >
                    フード一覧で表示
                </button>
                </div>
            </section>

            {/* 栄養素フィルタ */}
            <section>
                <h2 className="text-lg font-bold mb-2 flex items-center gap-1">
                    栄養素でフィルタ
                </h2>
                <div className="space-y-4 p-4 bg-white rounded">

                    {/*  レンジスライダー */}
                    <div className="mb-6">
                        <div className="mb-4">
                            <DualRangeSlider
                            label="タンパク質 (%)"
                            min={nutrientRanges.protein.min}
                            max={nutrientRanges.protein.max}
                            step={0.5}
                            value={proteinRange}
                            onValueChange={(newRange) =>
                                setProteinRange(newRange as [number, number])
                            }
                            />
                        </div>
                        
                        <div className="mb-4">
                            <DualRangeSlider
                            label="脂質 (%)"
                            min={nutrientRanges.fat.min}
                            max={nutrientRanges.fat.max}
                            step={0.5}
                            value={fatRange}
                            onValueChange={(newRange) =>
                                setFatRange(newRange as [number, number])
                            }
                            />
                        </div>

                        <div className="mb-4">
                            <DualRangeSlider
                            label="粗繊維 (%)"
                            min={nutrientRanges.fiber.min}
                            max={nutrientRanges.fiber.max}
                            step={0.5}
                            value={fiberRange}
                            onValueChange={(newRange) =>
                                setFiberRange(newRange as [number, number])
                            }
                            />
                        </div>
                    </div>

                    {/* 手入力 */}
                    {/* 
                    {(["protein","fat","fiber"] as const).map((nutrient)=>(
                        <div key={nutrient}>
                            <label className="block font-semibold mb-1">{nutrient === "protein" ? "タンパク質" : nutrient === "fat" ? "脂質" : "粗繊維"}</label>
                            <div className="flex items-center space-x-2">
                                <input
                                type="number"
                                step={0.5}
                                min={nutrientRanges[nutrient].min}
                                max={nutrientRanges[nutrient].max}
                                value={nutrientFilter[nutrient][0]}
                                onChange={(e) => handleChange(nutrient, 0, parseFloat(e.target.value))}
                                className="w-16 border rounded px-1"
                                />
                                <span>〜</span>
                                <input
                                type="number"
                                step={0.5}
                                min={nutrientRanges[nutrient].min}
                                max={nutrientRanges[nutrient].max}
                                value={nutrientFilter[nutrient][1]}
                                onChange={(e) => handleChange(nutrient, 1, parseFloat(e.target.value))}
                                className="w-16 border rounded px-1"
                                />
                                <span>%</span>
                            </div>
                        </div>
                    ))}
                        */}

                </div>

            </section>
            
            {/* うちのこ情報 */}
            <section>
                <h2 className="text-lg font-bold mb-2 flex items-center gap-1">
                    🐾うちのこ情報
                </h2>
                {/* ライフステージ（セレクトボックス） */}
                <label className="block text-sm mb-2">
                    ライフステージ：
                    <select 
                    value={myPet?.stage ?? ""}
                    onChange={handleStageChange}
                    className="mt-1 p-2 w-full rounded text-black">
                        <option>選択してください</option>
                        <option value="成犬_去勢済">成犬：去勢(避妊)済み</option>
                        <option value="成犬_未去勢">成犬：去勢(避妊)なし</option>
                        <option value="シニア犬">シニア犬</option>
                        <option value="子犬_4ヶ月未満">子犬：4ヶ月未満</option>
                        <option value="子犬_4〜9ヶ月">子犬：4〜9ヶ月</option>
                        <option value="子犬_9〜12ヶ月">子犬：9〜12ヶ月</option>
                    </select>
                </label>

                {/* 理想体重 */}
                <label className="block text-sm">
                理想体重（kg）：
                <input
                    type="number"
                    className="mt-1 p-2 w-full rounded text-black"
                    placeholder="例：5.5"
                    value={myPet?.weightKg ?? ""}
                    onChange={handleWeightChange}
                />
                </label>
            </section>

            {/* 絞り込み：アイコン条件 */}
            <section>
                <h2 className="text-lg font-bold mb-2">
                🔍 絞り込み
                </h2>
                <div className="space-y-1 text-sm">
                <label className="block">
                    <input type="checkbox"
                        checked={isOrganic}
                        onChange={(e) => setIsOrganic(e.target.checked)}
                        className="mr-2" /> オーガニック
                </label>
                <label className="block">
                    <input type="checkbox" className="mr-2" /> グレインフリー
                </label>
                <label className="block">
                    <input type="checkbox" className="mr-2" /> 高タンパク（28%以上）
                </label>
                <label className="block">
                    <input type="checkbox" className="mr-2" /> 低脂質（10%以下）
                </label>
                <label className="block">
                    <input type="checkbox" className="mr-2" /> 国産
                </label>
                </div>
            </section>


            {/* 絞り込み：価格 */}
            <section>
                <h2 className="text-lg font-bold mb-2">
                💸 価格
                </h2>

                <div className="text-sm space-y-2">
                {/* 切り替え */}
                <div className="flex items-center gap-2">
                    <label>
                    <input type="radio" name="priceUnit" defaultChecked /> 1袋あたり
                    </label>
                    <label>
                    <input type="radio" name="priceUnit" /> 1kgあたり
                    </label>
                </div>

                {/* 最小・最大 */}
                <div className="flex gap-2 items-center">
                    <input
                    type="number"
                    placeholder="最小"
                    className="p-2 w-full rounded text-black"
                    />
                    <span>〜</span>
                    <input
                    type="number"
                    placeholder="最大"
                    className="p-2 w-full rounded text-black"
                    />
                </div>

                <button className="bg-white text-[#4e6e89] font-bold py-1 px-4 rounded mt-2">
                    OK
                </button>
                </div>
            </section>
        </aside>

    );
}