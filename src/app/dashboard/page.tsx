'use client';
import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase/config";

const Sidebar = dynamic(() => import('../components/sidebar'), { ssr: false });
const Header = dynamic(() => import('../components/header'), { ssr: false });
const Main = dynamic(() => import('../components/main'), { ssr: false });

const Layout: React.FC = () => {
  const [selectedMenu, setSelectedMenu] = useState("dashboard");
  const [activeMenu, setActiveMenu] = useState<string>("dashboard");
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
    setActiveMenu(menu);
    setSelectedMenu(menu);
  };

  return (
    <div className="flex bg-[#eeeeee]">
      <div className="fixed top-0 left-0 w-[320px] h-full overflow-y-auto z-50">
        <Sidebar handleMenuClick={handleMenuClick} />
      </div>
      <div className="flex flex-col flex-1 min-h-screen ml-[300px] overflow-x-hidden z-0">
        <Header activeMenu={activeMenu} />
        <div className="flex-1 mx-auto bg-[#eeeeee] h-full w-[100%] p-4 md:p-6 2xl:p-10 overflow-x-hidden overflow-y-auto">
          <Main selectedMenu={selectedMenu} />
        </div>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Layout), { ssr: false });
