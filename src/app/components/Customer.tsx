import React from "react";
import Link from "next/link";

const OrdersContent: React.FC = () => {
  return (
    <div className="px-4 pt-14 max-w-[1400px] mx-auto">
      <div className="w-full flex gap-5 items-center">
        <div className="w-1/2 flex flex-col gap-2">
          <label className="w-full" htmlFor="firstName">
            First Name
          </label>
          <input
            className="w-full h-10 pl-4 rounded-lg"
            type="text"
            id="firstName"
          />
        </div>
        <div className="w-1/2 flex flex-col gap-2">
          <label className="w-full" htmlFor="lastName">
            Last Name
          </label>
          <input
            className="w-full h-10 pl-4 rounded-lg"
            type="text"
            id="lastName"
          />
        </div>
      </div>
      <div className="pt-4 w-1/2 flex flex-col gap-2">
        <label className="w-full" htmlFor="lastName">
          Phone No
        </label>
        <input
          className="w-full h-10 pl-4 rounded-lg"
          type="text"
          id="lastName"
        />
      </div>
      <div className="pt-4 flex flex-col gap-2">
        <label className="w-full" htmlFor="lastName">
          Address
        </label>
        <input
          className="w-full h-10 pl-4 rounded-lg"
          type="text"
          id="lastName"
        />
      </div>
      <div className="pt-4 w-full flex gap-5 items-center">
        <div className="w-1/2 flex flex-col gap-2">
          <label className="w-full" htmlFor="firstName">
            State
          </label>
          <input
            className="w-full h-10 pl-4 rounded-lg"
            type="text"
            id="firstName"
          />
        </div>
        <div className="w-1/2 flex flex-col gap-2">
          <label className="w-full" htmlFor="lastName">
            Country
          </label>
          <input
            className="w-full h-10 pl-4 rounded-lg"
            type="text"
            id="lastName"
          />
        </div>
      </div>

      <Link href="/dashboard" className="flex justify-end">
        <button className=" mt-6 px-5 py-2 rounded-xl font-semibold text-white bg-[#ff5801]">Add</button>
      </Link>
    </div>
  );
};
export default OrdersContent;
