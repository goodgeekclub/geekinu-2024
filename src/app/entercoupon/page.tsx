"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AirtableService } from "../lib/airtable.service";

const couponTableService = new AirtableService("Coupon");
const prizeTableService = new AirtableService("Prize");

export default function EnterCouponPage() {
  const [couponRecords, setCouponRecords] = useState<any[]>([]);
  const [prizeRecords, setPrizeRecords] = useState<any[]>([]);
  const [couponCode, setCouponCode] = useState("");
  const router = useRouter();

  useEffect(() => {
    couponTableService
      .listRecords()
      .then((res) => setCouponRecords(res.slice()));
    prizeTableService.listRecords().then((res) => setPrizeRecords(res.slice()));
  }, []);

  const onCheckCoupon = async () => {
    const couponRecord = couponRecords.find(
      (r) => r.fields.code === couponCode
    );

    if (couponRecord && couponRecord.fields.status === "UNUSED") {
      await couponTableService.updateRecord(couponRecord.id, {
        status: "USED",
      });

      if (couponRecord.fields.type === "SPECIAL") {
        const prizeTableRecords = await prizeTableService.listRecords();

        if (prizeTableRecords.length === 0) {
          alert("No unused prize codes available.");
          return;
        }

        const randomIndex = Math.floor(
          Math.random() * prizeTableRecords.length
        );
        const randomPrizeCode = prizeTableRecords[randomIndex].fields.code;

        alert(`Special code is: ${randomPrizeCode}`);
      }
      
      alert(`Coupon code is correct!!.`);
      router.push("/enternumber");
    } else {
      alert("Coupon code is used or invalid.");
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCouponCode(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onCheckCoupon();
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-black">
      <div className="w-[620px] px-5 flex flex-col items-center space-y-5">
        <form action="" className="space-y-5 w-full flex flex-col items-center">
          <label htmlFor="">Enter Coupon</label>
          <input
            className="text-black max-w-full h-10"
            type="text"
            value={couponCode}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
        </form>
        <button className="p-1 border" onClick={onCheckCoupon}>
          Submit
        </button>
      </div>
    </div>
  );
}
