import React from "react";

import { TEST_MANTA, TEST_USDC, TEST_USDT, TEST_WBTC } from "@/constant";
import { getAggregateMarketStats } from "@/lib/services/lendingPoolService";

const MarketOverview = () => {
  const marketData = getAggregateMarketStats([
    TEST_USDC,
    TEST_USDT,
    TEST_WBTC,
    TEST_MANTA,
  ]);

  const overviewData = [
    {
      title: "Total market size",
      value: marketData.then((data) => Number(data.totalMarketSize) / 10 ** 18),
    },
    {
      title: "Total available",
      value: marketData.then((data) => Number(data.totalAvailable) / 10 ** 18),
    },
    {
      title: "Total borrows",
      value: marketData.then((data) => Number(data.totalBorrows) / 10 ** 18),
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
              {data.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MarketOverview;
