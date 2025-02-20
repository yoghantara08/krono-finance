import { useEffect, useState } from "react";

import BigNumber from "bignumber.js";
import { Address } from "viem";
import { lisk } from "viem/chains";
import { useWalletClient } from "wagmi";

import {
  LENDING_POOL_ADDRESS,
  TEST_USDC,
  TEST_USDT,
  TEST_WBTC,
} from "@/constant";
import LENDING_POOL_ABI from "@/lib/abi/LendingPoolABI.json";
import { publicClient } from "@/lib/services/lendingPoolService";

const useSupply = (user?: Address) => {
  const { data } = useWalletClient();

  const [balances, setBalances] = useState({
    TEST_USDC: "0",
    TEST_USDT: "0",
    TEST_WBTC: "0",
  });

  useEffect(() => {
    if (!user) return;

    const fetchBalances = async () => {
      try {
        const [usdcShares, usdtShares, wbtcCollateral] = await Promise.all([
          publicClient.readContract({
            address: LENDING_POOL_ADDRESS,
            abi: LENDING_POOL_ABI,
            functionName: "getUserSupplyShares",
            args: [user, TEST_USDC],
          }),
          publicClient.readContract({
            address: LENDING_POOL_ADDRESS,
            abi: LENDING_POOL_ABI,
            functionName: "getUserSupplyShares",
            args: [user, TEST_USDT],
          }),

          publicClient.readContract({
            address: LENDING_POOL_ADDRESS,
            abi: LENDING_POOL_ABI,
            functionName: "getUserCollateral",
            args: [user, TEST_WBTC],
          }),
        ]);

        setBalances({
          TEST_USDC: usdcShares as "string",
          TEST_USDT: usdtShares as "string",
          TEST_WBTC: wbtcCollateral as "string",
        });
      } catch (error) {
        console.error("Error fetching balances:", error);
      }
    };

    fetchBalances();
  }, [user]);

  const totalBalance = BigNumber(balances.TEST_USDC)
    .plus(balances.TEST_USDT)
    .plus(BigNumber(balances.TEST_WBTC).times("95000"))
    .toString();

  const withdraw = async (token: Address, amount: bigint, account: Address) => {
    if (!data || !account) return;

    try {
      const functionName = [TEST_USDC, TEST_USDT].includes(token)
        ? "withdraw"
        : "withdrawCollateral";
      const hash = await data.writeContract({
        account,
        chain: lisk,
        address: LENDING_POOL_ADDRESS,
        abi: LENDING_POOL_ABI,
        functionName,
        args: [token, amount],
      });
      return hash;
    } catch (error) {
      console.error("Error withdrawing:", error);
      throw error;
    }
  };

  return { balances, totalBalance, withdraw };
};

export default useSupply;
