import React from "react";

const DashboardOverview = () => {
  return (
    <section className="space-y-3">
      <h2 className="w-fit text-2xl font-semibold md:text-3xl">Dashboard</h2>
      <div className="flex flex-wrap items-center gap-2 md:flex-row md:gap-4">
        <div className="min-w-[120px] space-y-1 rounded-md border bg-surface px-3 py-2 md:px-4">
          <p className="text-sm text-secondary">Net worth</p>
          <p className="text-2xl font-medium">
            <span className="text-secondary">$</span>
            200
          </p>
        </div>
        <div className="min-w-[120px] space-y-1 rounded-md border bg-surface px-3 py-2 md:px-4">
          <p className="text-sm text-secondary">Net APY</p>
          <p className="text-2xl font-medium">
            5.16<span className="text-secondary">%</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default DashboardOverview;
