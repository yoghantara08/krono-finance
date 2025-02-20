import BigNumber from "bignumber.js";
import { Address, createPublicClient, http, WalletClient } from "viem";
import { lisk } from "viem/chains";
import { publicActionsL2 } from "viem/op-stack";

import { ASSET_LIST, LENDING_POOL_ADDRESS } from "@/constant";
import LENDING_POOL_ABI from "@/lib/abi/LendingPoolABI.json";
import { MarketData } from "@/types";

export const publicClient = createPublicClient({
  chain: lisk,
  transport: http(),
}).extend(publicActionsL2());

// Function to get market data for a given token address
export async function getMarketData(token: string) {
  const data = await publicClient.readContract({
    address: LENDING_POOL_ADDRESS,
    abi: LENDING_POOL_ABI,
    functionName: "getMarketData",
    args: [token],
  });
  // Returns an object:
  // { totalSupply, totalBorrow, supplyApy, borrowApy }
  return data as MarketData;
}

export async function getAggregateMarketStats(tokens: string[]): Promise<{
  totalMarketSize: BigNumber;
  totalAvailable: BigNumber;
  totalBorrows: BigNumber;
}> {
  let totalMarketSize = new BigNumber("0");
  let totalAvailable = new BigNumber("0");
  let totalBorrows = new BigNumber("0");

  // Loop through each token and accumulate market data with price calculations
  for (const token of tokens) {
    const marketData = (await getMarketData(token)) as MarketData;

    // Get token price based on token address
    let tokenPrice = BigNumber("0");
    if (token === ASSET_LIST.USDC.address) {
      tokenPrice = BigNumber(ASSET_LIST.USDC.price);
    } else if (token === ASSET_LIST.USDT.address) {
      tokenPrice = BigNumber(ASSET_LIST.USDT.price);
    } else if (token === ASSET_LIST.WBTC.address) {
      tokenPrice = BigNumber(ASSET_LIST.WBTC.price);
    }

    // Calculate USD value for total market size
    const supplyInUsd = BigNumber(marketData.totalSupply)
      .div(10 ** 18)
      .multipliedBy(tokenPrice);

    totalMarketSize = BigNumber(totalMarketSize).plus(supplyInUsd);

    // Only calculate available and borrows for USDC and USDT
    if (
      token === ASSET_LIST.USDC.address ||
      token === ASSET_LIST.USDT.address
    ) {
      const borrowInUsd = BigNumber(marketData.totalBorrow)
        .div(10 ** 18)
        .multipliedBy(tokenPrice);
      totalBorrows = totalBorrows.plus(borrowInUsd);
      totalAvailable = supplyInUsd.minus(borrowInUsd);
    }
  }

  return {
    totalMarketSize,
    totalAvailable,
    totalBorrows,
  };
}

// Supply (deposit) a token into the protocol
export async function supply(
  token: Address,
  amount: bigint,
  walletClient: WalletClient,
  account: Address,
) {
  const hash = await walletClient.writeContract({
    account,
    chain: lisk,
    address: LENDING_POOL_ADDRESS,
    abi: LENDING_POOL_ABI,
    functionName: "supply",
    args: [token, amount],
  });
  return hash;
}

// Supply a token as collateral
export async function supplyCollateral(
  token: string,
  amount: bigint,
  walletClient: WalletClient,
  account: Address,
) {
  const hash = await walletClient.writeContract({
    account,
    chain: lisk,
    address: LENDING_POOL_ADDRESS,
    abi: LENDING_POOL_ABI,
    functionName: "supplyCollateral",
    args: [token, amount],
  });
  return hash;
}

// Borrow a token (only USDC/USDT allowed in this example)
export async function borrow(
  token: string,
  amount: bigint,
  walletClient: WalletClient,
  account: Address,
) {
  const hash = await walletClient.writeContract({
    account,
    chain: lisk,
    address: LENDING_POOL_ADDRESS,
    abi: LENDING_POOL_ABI,
    functionName: "borrow",
    args: [token, amount],
  });
  return hash;
}
