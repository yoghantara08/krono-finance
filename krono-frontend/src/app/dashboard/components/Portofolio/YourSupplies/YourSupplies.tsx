"use client";
import React from "react";

import classNames from "classnames";
import { useAccount } from "wagmi";

import useDashboard from "@/app/dashboard/hooks/useDashboard";
import useSupply from "@/app/dashboard/hooks/useSupply";
import { ASSET_LIST } from "@/constant";
import useWindowSize from "@/hooks/useWindowSize";
import { formatCurrency } from "@/lib/utils";

import WithdrawModal from "../../ActionModal/WithdrawModal";

import SuppliesCard from "./SuppliesCard";
import SuppliesItem from "./SuppliesItem";

export const YOUR_SUPPLIES_COLUMNS = {
  ASSET: { width: "30%", title: "Asset" },
  BALANCE: { width: "25%", title: "Balance" },
  SUPPLY_APY: { width: "25%", title: "Supply APY" },
  ACTIONS: { width: "20%", title: "" },
} as const;

const YourSupplies = () => {
  const { isMobile } = useWindowSize();
  const { openWithdrawModal, updateWithdrawAssetItem } = useDashboard();
  const { address } = useAccount();

  const { balances, totalBalance } = useSupply(address);

  return (
    <div className="h-fit w-full rounded-md border bg-surface">
      <div className="space-y-3 p-3 md:space-y-4 md:px-4">
        <h3 className="text-lg font-medium">Your Supplies</h3>

        <div className="flex items-center gap-3 text-sm text-secondary">
          <div className="rounded-md border px-2 py-1">
            Balance $
            <span className="font-medium text-white">
              {formatCurrency(totalBalance)}
            </span>
          </div>
          <div className="rounded-md border px-2 py-1">
            APY <span className="font-medium text-white">6</span>%
          </div>
          {/* <div className="rounded-md border px-2 py-1">
            Collateral $
            <span className="font-medium text-white">{totalCollateral}</span>
          </div> */}
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
            asset={{
              token: ASSET_LIST.USDC,
              balance: formatCurrency(balances.TEST_USDC),
              withdraw: () => {
                openWithdrawModal();
                updateWithdrawAssetItem({
                  token: ASSET_LIST.USDC,
                  balance: formatCurrency(balances.TEST_USDC),
                  apy: "6",
                });
              },
              apy: "6",
            }}
          />
          <SuppliesCard
            asset={{
              token: ASSET_LIST.USDT,
              balance: formatCurrency(balances.TEST_USDT),
              withdraw: () => {
                openWithdrawModal();
                updateWithdrawAssetItem({
                  token: ASSET_LIST.USDT,
                  balance: formatCurrency(balances.TEST_USDT),
                  apy: "6",
                });
              },
              apy: "6",
            }}
          />

          <SuppliesCard
            asset={{
              token: ASSET_LIST.WBTC,
              balance: formatCurrency(balances.TEST_WBTC),
              withdraw: () => {
                openWithdrawModal();
                updateWithdrawAssetItem({
                  token: ASSET_LIST.WBTC,
                  balance: formatCurrency(balances.TEST_WBTC),
                  apy: "0",
                });
              },
              apy: "0",
            }}
          />
        </>
      ) : (
        <>
          <SuppliesItem
            asset={{
              token: ASSET_LIST.USDC,
              balance: formatCurrency(balances.TEST_USDC),
              withdraw: () => {
                openWithdrawModal();
                updateWithdrawAssetItem({
                  token: ASSET_LIST.USDC,
                  balance: formatCurrency(balances.TEST_USDC),
                  apy: "6",
                });
              },
              apy: "6",
            }}
          />
          <SuppliesItem
            asset={{
              token: ASSET_LIST.USDT,
              balance: formatCurrency(balances.TEST_USDT),
              withdraw: () => {
                openWithdrawModal();
                updateWithdrawAssetItem({
                  token: ASSET_LIST.USDT,
                  balance: formatCurrency(balances.TEST_USDT),
                  apy: "6",
                });
              },
              apy: "6",
            }}
          />

          <SuppliesItem
            asset={{
              token: ASSET_LIST.WBTC,
              balance: formatCurrency(balances.TEST_WBTC),
              withdraw: () => {
                openWithdrawModal();
                updateWithdrawAssetItem({
                  token: ASSET_LIST.WBTC,
                  balance: formatCurrency(balances.TEST_WBTC),
                  apy: "0",
                });
              },
              apy: "0",
            }}
          />
        </>
      )}

      <WithdrawModal />
    </div>
  );
};

export default YourSupplies;
