'use client';
import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import Main from "../components/main";
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase/config";

const Layout: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState("orders");
  const [activeMenu, setActiveMenu] = useState<string>("orders");
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
    setActiveMenu(menu); // Ensure active menu updates
  };

  return (
    <div className="flex bg-white h-screen">
      <Sidebar handleMenuClick={handleMenuClick} />
      <div className="relative flex flex-1 flex-col">
        <Header activeMenu={activeMenu} />
        <div className="mx-auto bg-[#F9F9F9] h-full w-full p-4 md:p-6 2xl:p-10">
          <Main selectedMenu={selectedMenu} />
        </div>
      </div>
    </div>
  );
};

export default Layout;
