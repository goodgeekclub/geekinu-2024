import { Dispatch, SetStateAction } from "react";
import { AirtableService } from "./airtable.service";

const couponTableService = new AirtableService("Coupon");
const applicantTableService = new AirtableService("Applicant");

export async function onCheckCoupon(
  e: React.FormEvent<HTMLFormElement>,
  inputCoupon: string,
  inputId: string,
  applicantCode1: string,
  applicantCode2: string,
  applicantCode3: string,
  applicantCode4: string,
  couponRecords: any[],
  applicantRecords: any[],
  setCouponRecords: Dispatch<SetStateAction<any[]>>,
  setRevealedCodes: Dispatch<SetStateAction<string[]>>,
  setError: Dispatch<SetStateAction<string>>,
  setSuccess: Dispatch<SetStateAction<string>>,
  setSpecial: Dispatch<SetStateAction<string>>,
  setApplicantCode1Error: Dispatch<SetStateAction<boolean>>,
  setApplicantCode2Error: Dispatch<SetStateAction<boolean>>,
  setApplicantCode3Error: Dispatch<SetStateAction<boolean>>,
  setApplicantCode4Error: Dispatch<SetStateAction<boolean>>
) {
  e.preventDefault();

  setApplicantCode1Error(false);
  setApplicantCode2Error(false);
  setApplicantCode3Error(false);
  setApplicantCode4Error(false);

  const couponRecord = couponRecords.find((r) => r.fields.code === inputCoupon);

  const applicantRecord = applicantRecords.find((r) => {
    return (
      r.fields.c1 === applicantCode1 &&
      r.fields.c2 === applicantCode2 &&
      r.fields.c3 === applicantCode3 &&
      r.fields.c4 === applicantCode4
    );
  });

  const applicantC1 = applicantRecords.find(
    (r) => r.fields.c1 === applicantCode1 && r.fields.qrcodes === inputId
  );
  const applicantC2 = applicantRecords.find(
    (r) => r.fields.c2 === applicantCode2 && r.fields.qrcodes === inputId
  );
  const applicantC3 = applicantRecords.find(
    (r) => r.fields.c3 === applicantCode3 && r.fields.qrcodes === inputId
  );
  const applicantC4 = applicantRecords.find(
    (r) => r.fields.c4 === applicantCode4 && r.fields.qrcodes === inputId
  );

  const idRecord = applicantRecords.find((r) => r.fields.qrcodes === inputId);

  if (couponRecord && couponRecord.fields.status === "UNUSED") {
    await couponTableService.updateRecord(couponRecord.id, {
      status: "USED",
    });

    const updatedCoupons = await couponTableService.listRecords();
    setCouponRecords(updatedCoupons.slice());

    if (couponRecord && couponRecord.fields.type === "NORMAL") {
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
    } else if (couponRecord && couponRecord.fields.type === "SPECIAL") {
      setSpecial("You got access to reveal your code :)");

      let revealedCodes: string[] = [];

      const revealC1 = idRecord.fields.c1;
      const revealC2 = idRecord.fields.c2;
      const revealC3 = idRecord.fields.c3;
      const revealC4 = idRecord.fields.c4;

      switch (couponRecord.fields.class) {
        case "bronze":
          revealedCodes = revealCodesInOrder([revealC1, revealC2, revealC3, revealC4], 1);
          break;
        case "silver":
          revealedCodes = revealCodesInOrder([revealC1, revealC2, revealC3, revealC4], 2);
          break;
        case "gold":
          revealedCodes = revealCodesInOrder([revealC1, revealC2, revealC3, revealC4], 3);
          break;
        case "platinum":
          revealedCodes = [revealC1, revealC2, revealC3, revealC4];
          break;
      }      
      setRevealedCodes(revealedCodes);

      if (applicantRecord && idRecord) {
        setSuccess("Congratulations!! You have received a reward. 🎉🎉");
      } else {
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
  } else {
    setError("coupon code already used");
  }
}

function revealCodesInOrder(codes: string[], revealCount: number): string[] {
    let revealed = ["", "", "", ""];
    let indices = [0, 1, 2, 3];
  
    // Shuffle the indices array
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
  
    // Reveal the specified number of codes
    for (let i = 0; i < revealCount; i++) {
      revealed[indices[i]] = codes[indices[i]];
    }
  
    return revealed;
  }
  