'use client';
import React from "react";
import dynamic from 'next/dynamic';

const Dashboard = dynamic(() => import("./dashboard"), { ssr: false });
const Orders = dynamic(() => import("./Customer"), { ssr: false });
const Company = dynamic(() => import("./Vehicle"), { ssr: false });
const Drivers = dynamic(() => import("./Order"), { ssr: false });
const Devices = dynamic(() => import("./customerData"), { ssr: false });
const Account = dynamic(() => import("./workorderData"), { ssr: false });
const Settings = dynamic(() => import("./vehicleData"), { ssr: false });

interface MainProps {
  selectedMenu: string;
}

const Main: React.FC<MainProps> = ({ selectedMenu }) => {
  const renderComponent = () => {
    switch (selectedMenu) {
      case "dashboard":
        return <Dashboard />;
      case "customer":
        return <Orders />;
      case "vehicles":
        return <Company />;
      case "orders":
        return <Drivers />;
      case "customers Data":
        return <Devices />;
      case "customers With Workorder":
        return <Account />;
      case "Vehicle Data":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="main pt-10">
      {renderComponent()}
    </div>
  );
};

export default Main;
