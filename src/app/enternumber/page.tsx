"use client";

import { useEffect, useState } from "react";
import { AirtableService } from "../lib/airtable.service";
import { useRouter } from "next/navigation";

const prizeTableService = new AirtableService("Prize");

export default function EnterPrizePage() {
  const [prizeRecords, setprizeRecords] = useState<any[]>([]);
  const [prizeCode, setPrizeCode] = useState("");
  const router = useRouter();

  useEffect(() => {
    prizeTableService.listRecords().then((res) => setprizeRecords(res.slice()));
  }, []);

  const onCheckPrize = () => {
    const prizeRecord = prizeRecords.find((r) => r.fields.code === prizeCode);
    if (prizeRecord && prizeRecord.fields.status === "UNUSED") {
      prizeTableService.updateRecord(prizeRecord.id, { status: "USED" });
      alert(`Congraturation!! You receive ${prizeRecord.fields.type}`);
      router.push("/entercoupon");
    } else {
      alert("Prize number is used or invalid.");
      router.push("/entercoupon");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrizeCode(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onCheckPrize();
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-black">
      <div className="w-[620px] px-5 flex flex-col items-center space-y-5">
        <form action="" className="space-y-5 w-full flex flex-col items-center">
          <label htmlFor="">Enter Number</label>
          <input
            className="text-black max-w-full  h-10"
            type="text"
            value={prizeCode}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
        </form>
        <button className="p-1 border" onClick={onCheckPrize}>
          Submit
        </button>
      </div>
    </div>
  );
}