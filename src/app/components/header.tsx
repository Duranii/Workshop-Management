import React from "react";
import search from "../../../public/Search.svg";
import filter from "../../../public/filter.svg";
interface HeaderProps {
  activeMenu: string;
}

const Header: React.FC<HeaderProps> = ({ activeMenu }) => {
  return (
    <>
      <div className="adjust_header flex fixed justify-between p-4 px-10 bg-white items-center">
        <div>
          <h1 className="text-[30px] font-[800]">
            {activeMenu.charAt(0).toUpperCase() + activeMenu.slice(1)}
          </h1>
        </div>
        <div className="relative flex items-center space-x-[18px]">
          <img className="absolute top-[14px] left-8" src={search.src}></img>
          <input
            className="rounded-xl text-[#B9B9B9] text-[13px] font-[400] w-[250px] py-3 pl-9 pr-2 border-[1px] border-[#E4E4E4]"
            type="text"
            placeholder="Search"
          />
          {/* filter */}
          <div>
            <button className="rounded-xl border-[#FF5701]">
              {/* flex */}
              <div className="px-4 flex py-[10px] space-x-2 items-center border-[#FF5701] rounded-lg border-[1px]">
                {/* img */}
                <div>
                  <img src={filter.src}></img>
                </div>
                {/* text */}
                <div className="font-Rubik text-[15px] font-[400] text-[#FF5701]">
                  Filters
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
