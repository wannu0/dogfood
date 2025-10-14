//Sidebar.tsx

import type { Stage,MyPet } from "./types";

type Props = {
    myPet: MyPet | undefined;
    setMyPet:(p:MyPet)=>void;
    isOrganic: boolean;
    setIsOrganic: (o: boolean) => void;
};

export default function Sidebar({ myPet, setMyPet, isOrganic, setIsOrganic }: Props){

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

    return(
        <aside className="bg-[#D0E1E8] text-[#193F5F] w-full max-w-xs p-6 space-y-6 shadow-md">
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