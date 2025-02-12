"use client";
import React from "react";

import classNames from "classnames";

import { ASSET_LIST } from "@/constant";

import SuppliesItem from "./SuppliesItem";

export const YOUR_SUPPLIES_COLUMNS = {
  ASSET: { width: "25%", title: "Asset" },
  BALANCE: { width: "25%", title: "Balance" },
  SUPPLY_APY: { width: "25%", title: "Supply APY" },
  ACTIONS: { width: "25%", title: "" },
} as const;

const YourSupplies = () => {
  return (
    <div className="h-fit w-full rounded-md border bg-surface">
      <div className="space-y-4 px-4 py-3">
        <h3 className="text-lg">Your supplies</h3>

        <div className="flex items-center gap-3 text-sm text-secondary">
          <div className="rounded-md border px-2 py-1">
            Balance $<span className="font-medium text-white">250.20</span>
          </div>
          <div className="rounded-md border px-2 py-1">
            APY <span className="font-medium text-white">5.4</span>%
          </div>
          <div className="rounded-md border px-2 py-1">
            Collateral $<span className="font-medium text-white">55.64</span>
          </div>
        </div>
      </div>

      <div className="flex w-full items-center border-b px-5 py-3">
        {Object.values(YOUR_SUPPLIES_COLUMNS).map(({ title, width }) => (
          <p
            key={title}
            className={classNames(
              "text-center text-sm text-secondary first:text-start",
            )}
            style={{ width }}
          >
            {title}
          </p>
        ))}
      </div>

      <SuppliesItem
        token={ASSET_LIST.USDC}
        balance={200}
        withdraw={() => {}}
        apy={5.4}
      />
      <SuppliesItem
        token={ASSET_LIST.USDT}
        balance={100}
        withdraw={() => {}}
        apy={4.7}
      />
    </div>
  );
};

export default YourSupplies;
