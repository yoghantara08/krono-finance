"use client";

import React from "react";

import BigNumber from "bignumber.js";
import { useAccount } from "wagmi";

import { formatCurrency } from "@/lib/utils";

import useBorrow from "../../hooks/useBorrow";
import useSupply from "../../hooks/useSupply";

export function DashboardOverview() {
  const { address } = useAccount();

  const { balances, totalBalance } = useSupply(address);
  const { debts, totalDebt } = useBorrow(address);

  const networth = BigNumber(totalBalance).minus(totalDebt).toString();

  const lendingAPY = new BigNumber(0.06);
  const borrowAPY = new BigNumber(0.05);

  const balanceUsdc = new BigNumber(balances.TEST_USDC);
  const balanceUsdt = new BigNumber(balances.TEST_USDT);
  const debtUsdc = new BigNumber(debts.TEST_USDC);
  const debtUsdt = new BigNumber(debts.TEST_USDT);

  const totalValue = balanceUsdc
    .plus(balanceUsdt)
    .plus(debtUsdc)
    .plus(debtUsdt);

  const totalAPYContribution = balanceUsdc
    .multipliedBy(lendingAPY)
    .plus(balanceUsdt.multipliedBy(lendingAPY))
    .minus(debtUsdc.multipliedBy(borrowAPY))
    .minus(debtUsdt.multipliedBy(borrowAPY));

  const netApyDecimal = totalValue.isZero()
    ? new BigNumber(0)
    : totalAPYContribution.dividedBy(totalValue);

  const netApyPercentage = netApyDecimal
    .multipliedBy(100)
    .toFixed(2)
    .toString();

  return (
    <section className="space-y-3">
      <h2 className="w-fit text-2xl font-semibold md:text-3xl">Dashboard</h2>
      <div className="flex flex-wrap items-center gap-2 md:flex-row md:gap-4">
        <div className="min-w-[120px] space-y-1 rounded-md border bg-surface px-3 py-2 md:px-4">
          <p className="text-sm text-secondary">Net worth</p>
          <p className="text-2xl font-medium">
            <span className="text-secondary">$</span>
            {formatCurrency(networth)}
          </p>
        </div>
        <div className="min-w-[120px] space-y-1 rounded-md border bg-surface px-3 py-2 md:px-4">
          <p className="text-sm text-secondary">Net APY</p>
          <p className="text-2xl font-medium">
            {netApyPercentage}
            <span className="text-secondary">%</span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default DashboardOverview;
