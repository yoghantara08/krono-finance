"use client";
import React from "react";

import classNames from "classnames";

import { ASSET_LIST } from "@/constant";

import BorrowsItem from "./BorrowsItem";

export const YOUR_BORROWS_COLUMNS = {
  ASSET: { width: "27.5%", title: "Asset" },
  DEBT: { width: "27.5%", title: "Debt" },
  SUPPLY_APY: { width: "27.5%", title: "Supply APY" },
  ACTIONS: { width: "17.5%", title: "" },
} as const;

const YourBorrows = () => {
  return (
    <div className="h-fit w-full rounded-md border bg-surface">
      <div className="space-y-4 px-4 py-3">
        <h3 className="text-lg">Your borrows</h3>

        <div className="flex items-center gap-3 text-sm text-secondary">
          <div className="rounded-md border px-2 py-1">
            Debt $<span className="font-medium text-white">100</span>
          </div>
          <div className="rounded-md border px-2 py-1">
            APY <span className="font-medium text-white">3</span>%
          </div>
        </div>
      </div>

      <div className="flex w-full items-center border-b px-5 py-3">
        {Object.values(YOUR_BORROWS_COLUMNS).map(({ title, width }) => (
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

      <BorrowsItem
        token={ASSET_LIST.USDC}
        debt={100}
        repay={() => {}}
        apy={3}
      />
    </div>
  );
};

export default YourBorrows;
