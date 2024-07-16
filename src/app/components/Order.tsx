'use client';
import React from "react";
import Link from "next/link";

const DriversContent: React.FC = () => {
  return (
    <div className="px-4 pt-14 max-w-[1400px] mx-auto">
      <div className="w-full flex gap-5 items-center">
        <div className="w-[15%] flex flex-col gap-2">
          <label className="w-full" htmlFor="workorderCode">
            Workorder Code
          </label>
          <input
            className="w-full h-10 pl-4 rounded-lg"
            type="text"
            id="workorderCode"
          />
        </div>
        <div className="w-[15%] flex flex-col gap-2">
          <label className="w-full" htmlFor="vehicleId">
            Vehicle ID
          </label>
          <input
            className="w-full h-10 px-4 rounded-lg"
            type="number"
            id="vehicleId"
          />
        </div>
      </div>
      <div className="mt-4 w-full flex gap-5 items-center">
        <div className="w-[28%] flex flex-col gap-2">
          <label className="w-full" htmlFor="workorderTime">
            Workorder Time
          </label>
          <input
            className="w-full h-10 pl-4 rounded-lg"
            type="text"
            id="workorderTime"
          />
        </div>
        <div className="w-[20%] flex flex-col gap-2">
          <label className="w-full" htmlFor="payment">
            Payment
          </label>
          <input
            className="w-full h-10 pl-4 rounded-lg"
            type="text"
            id="payment"
          />
        </div>
      </div>
      <div className="pt-4 flex flex-col gap-2">
        <label className="w-full" htmlFor="advisoryNote">
          Advisory Note
        </label>
        <textarea
          className="px-4 py-2 rounded-lg"
          id="advisoryNote"
          rows={5}
          placeholder="type note..."
        ></textarea>
      </div>

      <Link href="/dashboard" className="flex justify-end">
        <button className="mt-6 px-5 py-2 rounded-xl font-semibold text-white bg-[#ff5801]">
          Add
        </button>
      </Link>
    </div>
  );
};

export default DriversContent;
