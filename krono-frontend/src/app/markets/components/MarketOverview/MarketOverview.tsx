import React from "react";

const MarketOverview = () => {
  const overviewData = [
    {
      title: "Total market size",
      value: 741.67,
    },
    {
      title: "Total available",
      value: 429.69,
    },
    {
      title: "Total borrows",
      value: 311.98,
    },
  ];

  return (
    <section className="space-y-3">
      <h2 className="w-fit text-2xl font-semibold md:text-3xl">Markets</h2>
      <div className="flex flex-wrap items-center gap-2 md:flex-row md:gap-4">
        {overviewData.map((data) => (
          <div
            key={data.title}
            className="space-y-1 rounded-md border bg-surface px-3 py-2 md:px-4"
          >
            <p className="text-xs text-secondary md:text-sm">{data.title}</p>
            <p className="font-medium md:text-2xl">
              <span className="text-secondary">$</span>
              {data.value}M
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MarketOverview;
