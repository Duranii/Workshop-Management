import React, { useState } from "react";
import Image from "next/image";
import SiderbarImage from "/public/work.png";
import DashboardIcon from "/public/dashboard.svg";
import DashboardIconActive from "/public/dashboard-active.svg";
import OrdersIcon from "/public/orders.svg";
import OrdersIconActive from "/public/orders-active.svg";
import DriversIcon from "/public/drivers.svg";
import DriversIconActive from "/public/drivers-active.svg";
import DevicesIcon from "/public/devices.svg";
import DevicesIconActive from "/public/devices-active.svg";
import AccountIcon from "/public/account.svg";
import AccountIconActive from "/public/account-active.svg";
import SettingsIcon from "/public/settings.svg";
import SettingsIconActive from "/public/settings-active.svg";
import TruckIcon from "/public/truck.svg";
import TruckIconActive from "/public/truck-active.svg";

interface SidebarProps {
  handleMenuClick: (menu: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ handleMenuClick }) => {
  const [activeMenu, setActiveMenu] = useState<string>("dashboard");
  const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(false);

  const handleButtonClick = (menu: string) => {
    setActiveMenu(menu);
    handleMenuClick(menu);
    setIsSidebarVisible(false);
  };

  const buttonClasses = (menu: string) =>
    activeMenu === menu
      ? "bg-[#c1c1c1] rounded-[8px] text-white"
      : "bg-transparent text-black";

  const getIcon = (menu: string) => {
    switch (menu) {
      case "dashboard":
        return activeMenu === "dashboard" ? DashboardIconActive : DashboardIcon;
      case "customer":
        return activeMenu === "customer" ? DriversIconActive : DriversIcon;
      case "vehicles":
        return activeMenu === "vehicles" ? TruckIconActive : TruckIcon;
      case "orders":
        return activeMenu === "orders" ? OrdersIconActive : OrdersIcon;
      case "customers Data":
        return activeMenu === "customers Data" ? DevicesIconActive : DevicesIcon;
      case "customers With Workorder":
        return activeMenu === "customers With Workorder" ? AccountIconActive : AccountIcon;
      case "settings":
        return activeMenu === "settings" ? SettingsIconActive : SettingsIcon;
      default:
        return DashboardIcon;
    }
  };

  return (
    <div>
      {/* Toggle button for smaller screens */}
      {!isSidebarVisible && (
        <button
          className="lg:hidden p-2 fixed top-4 left-4 text-2xl text-black z-[10000] rounded"
          onClick={() => setIsSidebarVisible(!isSidebarVisible)}
        >
          ☰
        </button>
      )}

      <aside
        id="logo-sidebar"
        className={`${
          isSidebarVisible ? "block" : "hidden"
        }  overflow-y-hidden rounded-r-3xl lg:block z-40 bg-white h-screen flex gap-8 font-inter font-[500] text-[16px] leading-[30px] flex-col items-start pt-[25px] px-[20px]`}
        aria-label="Sidebar"
      >
        {/* Close button for smaller screens */}
        {isSidebarVisible && (
          <button
            className="lg:hidden p-2 absolute -top-2 right-4 text-2xl text-black rounded"
            onClick={() => setIsSidebarVisible(false)}
          >
            ✕
          </button>
        )}

        <div className="bg-orange-500 rounded-lg">
          <Image src={SiderbarImage} alt="BgImage" className="lg:mb-8" />
        </div>
        <button
          className={`w-[100%] px-4 py-2 flex items-center gap-6 ${buttonClasses(
            "dashboard"
          )}`}
          onClick={() => handleButtonClick("dashboard")}
        >
          <Image
            src={getIcon("dashboard")}
            alt="Dashboard"
            width={20}
            height={20}
          />
          <p>Dashboard</p>
        </button>
        <button
          className={`w-[100%] px-4 py-2 flex items-center gap-6 ${buttonClasses(
            "customer"
          )}`}
          onClick={() => handleButtonClick("customer")}
        >
          <Image
            src={getIcon("customer")}
            alt="customer"
            width={25}
            height={25}
          />
          <p className="ml-[-3px]">Customer Entry</p>
        </button>
        <button
          className={`w-[100%] px-4 py-2 flex items-center gap-6 ${buttonClasses(
            "vehicles"
          )}`}
          onClick={() => handleButtonClick("vehicles")}
        >
          <Image
            src={getIcon("vehicles")}
            alt="vehicles"
            width={25}
            height={25}
          />
          <p className="ml-[-4px]">Vehicle Entry</p>
        </button>
        <button
          className={`w-[100%] px-4 py-2 flex items-center gap-6 ${buttonClasses(
            "orders"
          )}`}
          onClick={() => handleButtonClick("orders")}
        >
          <Image
            src={getIcon("orders")}
            alt="orders"
            width={20}
            height={20}
          />
          <p>Order Entry</p>
        </button>
        <button
          className={`w-[100%] px-4 py-2 flex items-center gap-6 ${buttonClasses(
            "customers Data"
          )}`}
          onClick={() => handleButtonClick("customers Data")}
        >
          <Image
            src={getIcon("customers Data")}
            alt="customers Data"
            width={25}
            height={25}
          />
          <p className="ml-[-3px]">Customers Data</p>
        </button>
        <button
          className={`w-[100%] px-4 py-2 flex items-center gap-6 ${buttonClasses(
            "customers With Workorder"
          )}`}
          onClick={() => handleButtonClick("customers With Workorder")}
        >
          <Image
            src={getIcon("customers With Workorder")}
            alt="customers With Workorder"
            width={20}
            height={20}
          />
          <p>Customer with WorkOrder</p>
        </button>
        {/* <button
          className={`w-[100%] px-4 py-2 flex items-center gap-6 ${buttonClasses(
            "settings"
          )}`}
          onClick={() => handleButtonClick("settings")}
        >
          <Image
            src={getIcon("settings")}
            alt="Settings"
            width={20}
            height={20}
          />
          <p>Settings</p>
        </button> */}
      </aside>
    </div>
  );
};

export default Sidebar;