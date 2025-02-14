"use client";
import React from "react";

import classNames from "classnames";
import { useAccount } from "wagmi";

import useDashboard from "@/app/dashboard/hooks/useDashboard";
import useSupply from "@/app/dashboard/hooks/useSupply";
import { ASSET_LIST } from "@/constant";
import useWindowSize from "@/hooks/useWindowSize";

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
  const { openWithdrawModal } = useDashboard();
  const { address } = useAccount();

  const { balances } = useSupply(address);

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
            asset={{
              token: ASSET_LIST.USDC,
              balance: 200,
              withdraw: () => {
                openWithdrawModal();
              },
              apy: 5.4,
            }}
          />
          <SuppliesCard
            asset={{
              token: ASSET_LIST.USDT,
              balance: 200,
              withdraw: () => {
                openWithdrawModal();
              },
              apy: 5.4,
            }}
          />
        </>
      ) : (
        <>
          <SuppliesItem
            asset={{
              token: ASSET_LIST.USDC,
              balance: Number(balances.TEST_USDC / 10n ** 18n),
              withdraw: () => {
                openWithdrawModal();
              },
              apy: 6,
            }}
          />
          <SuppliesItem
            asset={{
              token: ASSET_LIST.USDT,
              balance: Number(balances.TEST_USDT / 10n ** 18n),
              withdraw: () => {
                openWithdrawModal();
              },
              apy: 6,
            }}
          />
          <SuppliesItem
            asset={{
              token: ASSET_LIST.MANTA,
              balance: Number(balances.TEST_MANTA / 10n ** 18n),
              withdraw: () => {
                openWithdrawModal();
              },
              apy: 0,
            }}
          />
          <SuppliesItem
            asset={{
              token: ASSET_LIST.WBTC,
              balance: Number(balances.TEST_WBTC / 10n ** 18n),
              withdraw: () => {
                openWithdrawModal();
              },
              apy: 0,
            }}
          />
        </>
      )}

      <WithdrawModal />
    </div>
  );
};

export default YourSupplies;
