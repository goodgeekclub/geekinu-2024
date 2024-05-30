"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { AirtableService } from "./lib/airtable.service";
import { onCheckCoupon } from "./lib/coupon.service";

import InputField from "./components/inputfield";
import CodeInputField from "./components/codeinputfield";
import Notification from "./components/notification";
import LoadingSkeleton from "./components/loadingskeleton"; 

const couponTableService = new AirtableService("Coupon");
const applicantTableService = new AirtableService("Applicant");

export default function Home() {
  const [couponRecords, setCouponRecords] = useState<any[]>([]);
  const [applicantRecords, setApplicantRecords] = useState<any[]>([]);
  const [revealedCodes, setRevealedCodes] = useState<string[]>([]);

  const [inputCoupon, setInputCoupon] = useState("");
  const [inputId, setInputId] = useState("");

  const [applicantCode1, setApplicantCode1] = useState("");
  const [applicantCode2, setApplicantCode2] = useState("");
  const [applicantCode3, setApplicantCode3] = useState("");
  const [applicantCode4, setApplicantCode4] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [special, setSpecial] = useState("");

  const [applicantCode1Error, setApplicantCode1Error] = useState(false);
  const [applicantCode2Error, setApplicantCode2Error] = useState(false);
  const [applicantCode3Error, setApplicantCode3Error] = useState(false);
  const [applicantCode4Error, setApplicantCode4Error] = useState(false);

  const [loading, setLoading] = useState(false);  

  useEffect(() => {
    couponTableService
      .listRecords()
      .then((res) => setCouponRecords(res.slice()));
    applicantTableService
      .listRecords()
      .then((res) => setApplicantRecords(res.slice()));
  }, []);

  const handleInputChange =
    (setter: Dispatch<SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);  
    await onCheckCoupon(
      e,
      inputCoupon,
      inputId,
      applicantCode1,
      applicantCode2,
      applicantCode3,
      applicantCode4,
      couponRecords,
      applicantRecords,
      setCouponRecords,
      setRevealedCodes,
      setError,
      setSuccess,
      setSpecial,
      setApplicantCode1Error,
      setApplicantCode2Error,
      setApplicantCode3Error,
      setApplicantCode4Error
    );
    setLoading(false);  
  };

  return (
    <div className="w-full h-screen flex justify-center bg-white text-black">
      <div className="w-[500px] h-full px-5 flex flex-col items-center justify-center space-y-5">
        <form onSubmit={handleSubmit} className="w-full flex flex-col ">
          <InputField
            label="Your ID"
            type="number"
            value={inputId}
            onChange={handleInputChange(setInputId)}
            required
            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <InputField
            label="Your Coupon"
            type="text"
            value={inputCoupon}
            onChange={handleInputChange(setInputCoupon)}
            required
          />
          <div className="mb-5 flex flex-col justify-center">
            <label
              htmlFor="Applicant1"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your Number
            </label>
            <div className="flex items-center justify-between gap-3">
              <CodeInputField
                value={applicantCode1}
                onChange={handleInputChange(setApplicantCode1)}
                error={applicantCode1Error}
              />
              <CodeInputField
                value={applicantCode2}
                onChange={handleInputChange(setApplicantCode2)}
                error={applicantCode2Error}
              />
              <CodeInputField
                value={applicantCode3}
                onChange={handleInputChange(setApplicantCode3)}
                error={applicantCode3Error}
              />
              <CodeInputField
                value={applicantCode4}
                onChange={handleInputChange(setApplicantCode4)}
                error={applicantCode4Error}
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-5 w-max text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center shadow-lg"
          >
            Submit
          </button>
        </form>
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {error && (
              <Notification
                message={error}
                type="error"
                onClose={() => setError("")}
              />
            )}
            {success && (
              <Notification
                message={success}
                type="success"
                onClose={() => setSuccess("")}
              />
            )}
            {special && (
              <Notification
                message={special}
                type="special"
                code1={revealedCodes[0]}
                code2={revealedCodes[1]}
                code3={revealedCodes[2]}
                code4={revealedCodes[3]}
                onClose={() => setSpecial("")}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
