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
      <h2 className="w-fit text-3xl font-semibold">Earn & Borrow</h2>
      <div className="flex items-center gap-4">
        {overviewData.map((data) => (
          <div
            key={data.title}
            className="rounded-md border bg-surface px-3 py-2"
          >
            <p className="text-sm text-secondary">{data.title}</p>
            <p className="text-2xl font-medium">
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
