"use client"
import { useEffect, useState } from "react";
import { AirtableService } from "../lib/airtable.service";

const couponTableService = new AirtableService('Coupon');

export default function Page() {
  const [records, setRecords] = useState<any[]>([]);
  useEffect(() => {
    couponTableService.listRecords().then(res => setRecords(res.slice()));
  }, [records]);
  return (
      <div>
          <h1>Games</h1>
          {
              records.map((record: any) => {
                  return (
                      <li key={record.id} className="m-2">
                          {record.fields.code} [{record.fields.status}]
                          <button className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => onMark(record)}>Mark</button>
                      </li>
                  )
              })
          }
      </div>
  )
}

function onMark(record: any) {
  const status = record.fields.status === 'UNUSED' ? 'USED' : 'UNUSED';
  couponTableService.updateRecord(record.id, {status});
}