"use client";
import React from "react";

import classNames from "classnames";
import { useAccount } from "wagmi";

import useBorrow from "@/app/dashboard/hooks/useBorrow";
import useDashboard from "@/app/dashboard/hooks/useDashboard";
import { ASSET_LIST } from "@/constant";
import useWindowSize from "@/hooks/useWindowSize";
import { formatCurrency } from "@/lib/utils";

import RepayModal from "../../ActionModal/RepayModal";

import BorrowsCard from "./BorrowsCard";
import BorrowsItem from "./BorrowsItem";

export const YOUR_BORROWS_COLUMNS = {
  ASSET: { width: "27.5%", title: "Asset" },
  DEBT: { width: "27.5%", title: "Debt" },
  SUPPLY_APY: { width: "27.5%", title: "Borrow APY" },
  ACTIONS: { width: "17.5%", title: "" },
} as const;

const YourBorrows = () => {
  const { isMobile } = useWindowSize();
  const { openRepayModal, updateRepayAssetItem } = useDashboard();
  const { address } = useAccount();

  const { debts, totalDebt } = useBorrow(address);

  return (
    <div className="h-fit w-full rounded-md border bg-surface">
      <div className="space-y-3 p-3 md:space-y-4 md:px-4">
        <h3 className="text-lg font-medium">Your Borrows</h3>

        <div className="flex items-center gap-3 text-sm text-secondary">
          <div className="rounded-md border px-2 py-1">
            Debt $
            <span className="font-medium text-white">
              {formatCurrency(totalDebt)}
            </span>
          </div>
          <div className="rounded-md border px-2 py-1">
            APY <span className="font-medium text-white">5</span>%
          </div>
        </div>
      </div>

      <div className="hidden w-full border-b px-5 py-3 md:flex md:items-center">
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

      {isMobile ? (
        <>
          <BorrowsCard
            asset={{
              token: ASSET_LIST.USDC,
              debt: formatCurrency(debts.TEST_USDC),
              apy: "5",
              repay: () => {
                openRepayModal();
                updateRepayAssetItem({
                  token: ASSET_LIST.USDC,
                  debt: formatCurrency(debts.TEST_USDC),
                  apy: "5",
                });
              },
            }}
          />
          <BorrowsCard
            asset={{
              token: ASSET_LIST.USDT,
              debt: formatCurrency(debts.TEST_USDT),
              apy: "5",
              repay: () => {
                openRepayModal();
                updateRepayAssetItem({
                  token: ASSET_LIST.USDT,
                  debt: formatCurrency(debts.TEST_USDT),
                  apy: "5",
                });
              },
            }}
          />
        </>
      ) : (
        <>
          <BorrowsItem
            asset={{
              token: ASSET_LIST.USDC,
              debt: formatCurrency(debts.TEST_USDC),
              apy: "5",
              repay: () => {
                openRepayModal();
                updateRepayAssetItem({
                  token: ASSET_LIST.USDC,
                  debt: formatCurrency(debts.TEST_USDC),
                  apy: "5",
                });
              },
            }}
          />
          <BorrowsItem
            asset={{
              token: ASSET_LIST.USDT,
              debt: formatCurrency(debts.TEST_USDT),
              apy: "5",
              repay: () => {
                openRepayModal();
                updateRepayAssetItem({
                  token: ASSET_LIST.USDT,
                  debt: formatCurrency(debts.TEST_USDT),
                  apy: "5",
                });
              },
            }}
          />
        </>
      )}

      <RepayModal />
    </div>
  );
};

export default YourBorrows;
