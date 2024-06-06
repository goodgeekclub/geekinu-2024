"use client";

import { Dispatch, SetStateAction, createRef, useEffect, useRef, useState } from "react";
import Image from "next/image";

import { AirtableService } from "./lib/airtable.service";
import { onCheckCoupon } from "./lib/coupon.service";

import InputField from "./components/inputfield";
import CodeInputField from "./components/codeinputfield";
import Notification from "./components/notification";
import LoadingSkeleton from "./components/loadingskeleton";

import Logo from "../../public/images/logo.png";

const couponTableService = new AirtableService("Coupon");
const applicantTableService = new AirtableService("Applicant");

export default function Home() {
  const [couponRecords, setCouponRecords] = useState<any[]>([]);
  const [applicantRecords, setApplicantRecords] = useState<any[]>([]);
  const [revealedCodes, setRevealedCodes] = useState<string[]>([]);
  const [focusIndex, setFocusIndex] = useState<number>(1);

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
  const [disableSubmit, setDisableSubmit] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const inputCodeRef1 = useRef<HTMLInputElement>(null);
  const inputCodeRef2 = useRef<HTMLInputElement>(null);
  const inputCodeRef3 = useRef<HTMLInputElement>(null);
  const inputCodeRef4 = useRef<HTMLInputElement>(null);

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
  const handleCodeInput = (idx: number, fn: Function, val: string) => {
    fn(val)
    if (idx === 1 && inputCodeRef2.current) {
      inputCodeRef2.current.focus();
    }
    if (idx === 2 && inputCodeRef3.current) {
      inputCodeRef3.current.focus();
    }
    if (idx === 3 && inputCodeRef4.current) {
      inputCodeRef4.current.focus();
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setDisableSubmit(true);
    setTimeout(() => setDisableSubmit(false), 2000);
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
    <div className="w-full relative h-full flex flex-col items-center justify-center bg-gray-100 text-gray-900">
      <div className="w-full max-w-md h-full px-6 flex flex-col space-y-10">
        <div className="">
          <div className="flex justify-center my-5 ">
            <Image src={Logo} width={250} height={0} alt="" loading="lazy" />
          </div>
        </div>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="w-full flex flex-col space-y-4"
        >
          <InputField
            label="Your ID"
            type="number"
            value={inputId}
            onChange={handleInputChange(setInputId)}
            required
            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <InputField
            label="Your Coupon"
            type="text"
            value={inputCoupon}
            onChange={handleInputChange(setInputCoupon)}
            required
            className="bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Your Number
            </label>
            <div className="flex items-center justify-between gap-2">
              <CodeInputField
                ref={inputCodeRef1}
                value={applicantCode1}
                onChange={(e) => handleCodeInput(1, setApplicantCode1, e.target.value)}
                autoFocus={focusIndex === 1}
                error={applicantCode1Error}
              />
              <CodeInputField
                ref={inputCodeRef2}
                value={applicantCode2}
                onChange={(e) => handleCodeInput(2, setApplicantCode2, e.target.value)}
                autoFocus={focusIndex === 2}
                error={applicantCode2Error}
              />
              <CodeInputField
                ref={inputCodeRef3}
                value={applicantCode3}
                onChange={(e) => handleCodeInput(3, setApplicantCode3, e.target.value)}
                autoFocus={focusIndex === 3}
                error={applicantCode3Error}
              />
              <CodeInputField
                ref={inputCodeRef4}
                value={applicantCode4}
                onChange={(e) => handleCodeInput(4, setApplicantCode4, e.target.value)}
                autoFocus={focusIndex === 4}
                error={applicantCode4Error}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={disableSubmit}
            className={`mt-5 w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow-lg ${
              disableSubmit
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300"
            }`}
          >
            Submit
          </button>
        </form>
        <div className="pt-5 pb-10 flex flex-col justify-start font-medium text-gray-700 leading-relaxed tracking-wide">
          <h4 className="mb-2 font-semibold">How to play :</h4>
          <li>
            Each person will receive four numbers to generate as their own.
          </li>
          <li>
            There will be a coupon that can be used to check the numbers in all
            four places, whether they are correct or not.
          </li>
          <li>
            Take a screenshot if all four numbers are correct and Redeem rewards
            during the event summary.
          </li>
        </div>
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
