"use client";
import React from "react";

import classNames from "classnames";

import { ASSET_LIST } from "@/constant";
import useWindowSize from "@/hooks/useWindowSize";

import SuppliesCard from "./SuppliesCard";
import SuppliesItem from "./SuppliesItem";

export const YOUR_SUPPLIES_COLUMNS = {
  ASSET: { width: "25%", title: "Asset" },
  BALANCE: { width: "25%", title: "Balance" },
  SUPPLY_APY: { width: "25%", title: "Supply APY" },
  ACTIONS: { width: "25%", title: "" },
} as const;

const YourSupplies = () => {
  const { isMobile } = useWindowSize();

  return (
    <div className="h-fit w-full rounded-md border bg-surface">
      <div className="space-y-3 p-3 md:space-y-4 md:px-4">
        <h3 className="text-lg font-medium">Your Supplies</h3>

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

      <div className="hidden w-full border-b px-5 py-3 md:flex md:items-center">
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

      {isMobile ? (
        <>
          <SuppliesCard
            token={ASSET_LIST.USDC}
            balance={200}
            withdraw={() => {}}
            apy={5.4}
          />
          <SuppliesCard
            token={ASSET_LIST.USDT}
            balance={100}
            withdraw={() => {}}
            apy={4.7}
          />
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default YourSupplies;
