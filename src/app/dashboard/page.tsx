'use client';
import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import Main from "../components/main";
import { useRouter } from 'next/navigation';

const Layout: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState("dashboard");
  const [activeMenu, setActiveMenu] = useState<string>("dashboard");
  const router = useRouter();

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
    setSelectedMenu(menu);
  };
  return (
    <div className="flex bg-white">
      <div className="rounded-r-3xl w-[320px] overflow-y-hidden h-screen static">
        <Sidebar handleMenuClick={handleMenuClick}/>
      </div>
      <div className="flex flex-col flex-1 min-h-screen overflow-x-hidden">
        <Header activeMenu={activeMenu} />
        <div className="flex-1 mx-auto bg-[#eeeeee] h-full w-[100%] p-4 md:p-6 2xl:p-10 overflow-y-auto">
          <Main selectedMenu={selectedMenu}/>
        </div>
      </div>
    </div>
  );
};

export default Layout;
