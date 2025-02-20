import { useEffect, useState } from "react";

import BigNumber from "bignumber.js";
import { Address } from "viem";

import { LENDING_POOL_ADDRESS, TEST_USDC, TEST_USDT } from "@/constant";
import LENDING_POOL_ABI from "@/lib/abi/LendingPoolABI.json";
import { publicClient } from "@/lib/services/dashboardService";

const useBorrow = (user?: Address) => {
  const [debts, setDebts] = useState({
    TEST_USDC: "0",
    TEST_USDT: "0",
  });

  useEffect(() => {
    if (!user) return;

    const fetchDebts = async () => {
      try {
        const [usdcShares, usdtShares] = await Promise.all([
          publicClient.readContract({
            address: LENDING_POOL_ADDRESS,
            abi: LENDING_POOL_ABI,
            functionName: "getUserBorrowShares",
            args: [user, TEST_USDC],
          }),
          publicClient.readContract({
            address: LENDING_POOL_ADDRESS,
            abi: LENDING_POOL_ABI,
            functionName: "getUserBorrowShares",
            args: [user, TEST_USDT],
          }),
        ]);

        console.log(usdcShares);
        console.log(usdtShares);

        setDebts({
          TEST_USDC: usdcShares as "string",
          TEST_USDT: usdtShares as "string",
        });
      } catch (error) {
        console.error("Error fetching Debts:", error);
      }
    };

    fetchDebts();
  }, [user]);

  const totalDebt = BigNumber(debts.TEST_USDC).plus(debts.TEST_USDT).toString();

  // const withdraw = async (token: Address, amount: bigint, account: Address) => {
  //   if (!data || !account) return;

  //   try {
  //     const functionName = [TEST_USDC, TEST_USDT].includes(token)
  //       ? "withdraw"
  //       : "withdrawCollateral";
  //     const hash = await data.writeContract({
  //       account,
  //       chain: mantaSepoliaTestnet,
  //       address: LENDING_POOL_ADDRESS,
  //       abi: LENDING_POOL_ABI,
  //       functionName,
  //       args: [token, amount],
  //     });
  //     return hash;
  //   } catch (error) {
  //     console.error("Error withdrawing:", error);
  //     throw error;
  //   }
  // };

  return { debts, totalDebt };
};

export default useBorrow;
