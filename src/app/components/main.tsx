import React from "react";
import Dashboard from "./dashboard";
import Orders from "./Customer";
import Company from "./Vehicle";
import Drivers from "./Order";
import Devices from "./devices";
import Account from "./account";
import Settings from "./settings";

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
      case "settings":
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
