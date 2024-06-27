import React from "react";
import Link from "next/link";

const CompanyContent: React.FC = () => {
  return (
    <div className="px-4 pt-14 max-w-[1400px] mx-auto">
      <div className="w-full flex gap-5 items-center">
        <div className="w-[40%] flex flex-col gap-2">
          <label className="w-full" htmlFor="firstName">
            Registeration No
          </label>
          <input
            className="w-full h-10 pl-4 rounded-lg"
            type="text"
            id="firstName"
          />
        </div>
        <div className="w-[40%] flex flex-col gap-2">
          <label className="w-full" htmlFor="lastName">
            Year
          </label>
          <input
            className="w-full h-10 px-4 rounded-lg"
            type="number"
            id="lastName"
          />
        </div>
      </div>
      <div className="mt-4 w-full flex gap-5 items-center">
        <div className="w-[28%] flex flex-col gap-2">
          <label className="w-full" htmlFor="firstName">
            Make
          </label>
          <input
            className="w-full h-10 pl-4 rounded-lg"
            type="text"
            id="firstName"
          />
        </div>
        <div className="w-[20%] flex flex-col gap-2">
          <label className="w-full" htmlFor="lastName">
            Model
          </label>
          <input
            className="w-full h-10 pl-4 rounded-lg"
            type="text"
            id="lastName"
          />
        </div>
      </div>
      <div className="pt-4 w-full flex gap-5 items-center">
        <div className="w-1/2 flex flex-col gap-2">
          <label className="w-full" htmlFor="firstName">
            Fuel
          </label>
          <input
            className="w-full h-10 pl-4 rounded-lg"
            type="text"
            id="firstName"
          />
        </div>
        <div className="w-[10%] flex flex-col gap-2">
          <label className="w-full" htmlFor="lastName">
            Mileage
          </label>
          <input
            className="w-full h-10 px-4 rounded-lg"
            type="number"
            min={6}
            max={25}
            defaultValue={8}
            id="lastName"
          />
        </div>
      </div>

      <Link href="/dashboard" className="flex justify-end">
        <button className=" mt-6 px-5 py-2 rounded-xl font-semibold text-white bg-[#ff5801]">
          Add
        </button>
      </Link>
    </div>
  );
};

export default CompanyContent;
