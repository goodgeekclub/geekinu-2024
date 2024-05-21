"use client";

import { useEffect, useState } from "react";
import { AirtableService } from "./lib/airtable.service";
import { motion } from "framer-motion";

const couponTableService = new AirtableService("Coupon");
const applicantTableService = new AirtableService("Applicant");


function generatePartialCode(code: string, length: number) {
  let partial = code.substring(0, length);
  return partial.padEnd(4, '_'); 
}

export default function Home() {
  const [couponRecords, setCouponRecords] = useState<any[]>([]);
  const [applicantRecords, setApplicantRecords] = useState<any[]>([]);

  const [couponCode, setCouponCode] = useState("");
  const [idCode, setIdCode] = useState("");
  const [applicantCode, setApplicantCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    couponTableService
      .listRecords()
      .then((res) => setCouponRecords(res.slice()));
    applicantTableService
      .listRecords()
      .then((res) => setApplicantRecords(res.slice()));
  }, []);

  const onCheckCoupon = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const couponRecord = couponRecords.find(
      (r) => r.fields.code === couponCode
    );

    const applicantRecord = applicantRecords.find(
      (r) => r.fields.code === applicantCode
    );

    const idRecord = applicantRecords.find((r) => r.fields.id === idCode);

    if (couponRecord && couponRecord.fields.status === "UNUSED") {
      await couponTableService.updateRecord(couponRecord.id, {
        status: "USED",
      });
      if (couponRecord.fields.type === "NORMAL") {
        if (applicantRecord && applicantRecord.fields.id === idCode) {
          setSuccess("Congratulations!! You have received a reward. 🎉🎉");
        } else {
          setError("Invalid applicant code or ID");
        }
      } else if (couponRecord.fields.type === "SPECIAL") {
        const code = idRecord.fields.code;
        let partialCode = "";
    
        if (couponRecord && couponRecord.fields.class === "platinum") {
            partialCode =  generatePartialCode(code, 4);
        } else if (couponRecord && couponRecord.fields.class === "gold") {
            partialCode = generatePartialCode(code, 3);
        } else if (couponRecord && couponRecord.fields.class === "silver") {
            partialCode = generatePartialCode(code, 2);
        } else {
            partialCode = generatePartialCode(code, 1);
        }
    
        setSuccess(
          `The location of the applicant's numbers for that ID is: ${partialCode}`
        );
      }
    } else {
      setError("Invalid coupon code or already used");
    }
  };

  const handleCouponChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCouponCode(e.target.value);
    console.log("coupon:", e.target.value);
  };

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdCode(e.target.value);
    console.log("id: ", e.target.value);
  };

  const handleApplicantChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setApplicantCode(e.target.value);
    console.log("applicant: ", e.target.value);
  };

  return (
    <div className="w-full h-screen flex justify-center bg-white text-black">
      <div className="w-[678px] h-full px-5 flex flex-col items-center justify-center space-y-5">
        <form onSubmit={onCheckCoupon} className="w-full">
          <div className="mb-5 ">
            <label
              htmlFor="text"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Your Coupon
            </label>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
              placeholder=""
              value={couponCode}
              onChange={handleCouponChange}
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="ID"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Your ID
            </label>
            <input
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder=""
              value={idCode}
              onChange={handleIdChange}
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="Applicant"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Your Number
            </label>
            <input
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder=""
              value={applicantCode}
              onChange={handleApplicantChange}
              required
            />
          </div>
          <button
            type="submit"
            className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center shadow-lg"
          >
            Submit
          </button>
        </form>
        {error && (
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ transitionEnd: { y: -10, opacity: 0 } }}
              transition={{ duration: 0.5 }}
              onAnimationComplete={() => {
                setTimeout(() => {
                  setError("");
                }, 10000);
              }}
              className="mx-5 absolute top-0 bg-yellow-400 px-4 md:px-8 py-4 text-xs md:text-sm rounded-xl shadow-lg"
            >
              {error}
            </motion.div>
        )}
        {success && (
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ transitionEnd: { y: -10, opacity: 0 } }}
            transition={{ duration: 0.5 }}
            onAnimationComplete={() => {
              setTimeout(() => {
                setSuccess("");
              }, 10000);
            }}
            className="mx-5 absolute top-0 bg-green-400 px-4 md:px-8 py-4 text-xs md:text-sm rounded-xl shadow-lg"
          >
            {success}
          </motion.div>
        )}
      </div>
    </div>
  );
}
