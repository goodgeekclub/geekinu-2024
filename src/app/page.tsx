"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { AirtableService } from "./lib/airtable.service";
import InputField from "./components/inputfield";
import CodeInputField from "./components/codeinputfield";
import Notification from "./components/notification";

const couponTableService = new AirtableService("Coupon");
const applicantTableService = new AirtableService("Applicant");

export default function Home() {
  const [couponRecords, setCouponRecords] = useState<any[]>([]);
  const [applicantRecords, setApplicantRecords] = useState<any[]>([]);

  const [couponCode, setCouponCode] = useState("");
  const [idCode, setIdCode] = useState("");

  const [applicantCode1, setApplicantCode1] = useState("");
  const [applicantCode2, setApplicantCode2] = useState("");
  const [applicantCode3, setApplicantCode3] = useState("");
  const [applicantCode4, setApplicantCode4] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [applicantCode1Error, setApplicantCode1Error] = useState(false);
  const [applicantCode2Error, setApplicantCode2Error] = useState(false);
  const [applicantCode3Error, setApplicantCode3Error] = useState(false);
  const [applicantCode4Error, setApplicantCode4Error] = useState(false);

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

    setCouponCode("");

    setApplicantCode1Error(false);
    setApplicantCode2Error(false);
    setApplicantCode3Error(false);
    setApplicantCode4Error(false);

    const couponRecord = couponRecords.find(
      (r) => r.fields.code === couponCode
    );

    const applicantRecord = applicantRecords.find((r) => {
      return (
        r.fields.c1 === applicantCode1 &&
        r.fields.c2 === applicantCode2 &&
        r.fields.c3 === applicantCode3 &&
        r.fields.c4 === applicantCode4
      );
    });

    const applicantC1 = applicantRecords.find(
      (r) => r.fields.c1 === applicantCode1 && r.fields.id === idCode
    );
    const applicantC2 = applicantRecords.find(
      (r) => r.fields.c2 === applicantCode2 && r.fields.id === idCode
    );
    const applicantC3 = applicantRecords.find(
      (r) => r.fields.c3 === applicantCode3 && r.fields.id === idCode
    );
    const applicantC4 = applicantRecords.find(
      (r) => r.fields.c4 === applicantCode4 && r.fields.id === idCode
    );

    const idRecord = applicantRecords.find((r) => r.fields.id === idCode);

    if (couponRecord && couponRecord.fields.status === "UNUSED") {
      await couponTableService.updateRecord(couponRecord.id, {
        status: "USED",
      });

      const updatedCoupons = await couponTableService.listRecords();
      setCouponRecords(updatedCoupons.slice());

      if (couponRecord.fields.type === "NORMAL") {
        if (applicantRecord && idRecord) {
          setSuccess("Congratulations!! You have received a reward. 🎉🎉");
        } else {
          setError(
            "One or more applicant code inputs are incorrect. Please check the highlighted fields."
          );
          if (!applicantC1) {
            setApplicantCode1Error(true);
          }
          if (!applicantC2) {
            setApplicantCode2Error(true);
          }
          if (!applicantC3) {
            setApplicantCode3Error(true);
          }
          if (!applicantC4) {
            setApplicantCode4Error(true);
          }
        }
      }
    } else if (couponRecord.fields.type === "SPECIAL") {
    } else {
      setError("coupon code already used");
    }
  };

  const handleInputChange =
    (setter: Dispatch<SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  return (
    <div className="w-full h-screen flex justify-center bg-white text-black">
      <div className="w-[500px] h-full px-5 flex flex-col items-center justify-center space-y-5">
        <form onSubmit={onCheckCoupon} className="w-full flex flex-col ">
          <InputField
            label="Your ID"
            type="number"
            value={idCode}
            onChange={handleInputChange(setIdCode)}
            required
          />
          <InputField
            label="Your Coupon"
            type="text"
            value={couponCode}
            onChange={handleInputChange(setCouponCode)}
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
      </div>
    </div>
  );
}
