import React from "react";

import DashboardOverview from "./components/DashboardOverview/DashboardOverview";
import YourBorrows from "./components/Portofolio/YourBorrows/YourBorrows";
import YourSupplies from "./components/Portofolio/YourSupplies/YourSupplies";

const page = () => {
  return (
    <div className="space-y-6 md:space-y-8">
      <DashboardOverview />
      <div className="flex flex-col gap-4 xl:flex-row">
        <YourSupplies />
        <YourBorrows />
      </div>
    </div>
  );
};

export default page;
