import React from "react";

import DashboardOverview from "./components/DashboardOverview/DashboardOverview";
import YourBorrows from "./components/Portofolio/YourBorrows/YourBorrows";
import YourSupplies from "./components/Portofolio/YourSupplies/YourSupplies";

const page = () => {
  return (
    <div className="space-y-8">
      <DashboardOverview />
      <div className="flex gap-4">
        <YourSupplies />
        <YourBorrows />
      </div>
    </div>
  );
};

export default page;
