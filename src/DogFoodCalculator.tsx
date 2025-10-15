//DogFoodCalculator.tsx
//import { useState } from "react";
import type { Stage } from "./types/types";

type Props = {
    stage:Stage;
    setStage:(s:Stage)=>void;
    idealWeight:number | undefined;
    setIdealWeight:(w:number)=>void;
    isOrganic: boolean;
    setIsOrganic: (o: boolean) => void;
};

export default function DogFoodCalculator({ stage, setStage, idealWeight, setIdealWeight, isOrganic, setIsOrganic }: Props) {
  //return----------------------------
  return (
    <div className="p-4 max-w-md mx-auto">

        {/*選択肢・入力欄を追加 */}
        <div>
            <div>
                <label>ライフステージ：</label>
                <select
                value={stage}
                onChange={(e)=>setStage(e.target.value as Stage)}
                className="border p-2 rounded"
                >
                    <option value="成犬_去勢済">成犬：去勢済</option>
                    <option value="成犬_未去勢">成犬：未去勢</option>
                    <option value="シニア犬">シニア犬</option>
                    <option value="子犬_4ヶ月未満">子犬：4ヶ月未満</option>
                    <option value="子犬_4〜9ヶ月">子犬：4〜9ヶ月未満</option>
                    <option value="子犬_9〜12ヶ月">子犬9〜12ヶ月未満</option>
                </select>
            </div>
            <div>
                <label>理想体重（kg）：</label>
                <input
                type="number"
                value={idealWeight}
                onChange={(e)=>setIdealWeight(Number(e.target.value))}
                className="border p-2 rounded ml-2"
                />
            </div>
        </div>

      {/*チェックボックス */}
      <div>
        <input 
        type="checkbox"
        checked={isOrganic}
        onChange={(e) => setIsOrganic(e.target.checked)}
        id="organic"
        name="organic"
        />
        <label htmlFor="organic">オーガニック</label>
      </div>
    </div>
  );
}
