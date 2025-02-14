import {
  Address,
  createPublicClient,
  http,
  PublicClient,
  WalletClient,
} from "viem";
import { mantaSepoliaTestnet } from "viem/chains";

import { LENDING_POOL_ADDRESS } from "@/constant";
import LENDING_POOL_ABI from "@/lib/abi/LendingPoolABI.json";
import { MarketData } from "@/types";

export const publicClient: PublicClient = createPublicClient({
  chain: mantaSepoliaTestnet,
  transport: http("https://pacific-rpc.sepolia-testnet.manta.network/http"),
});

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
  totalMarketSize: bigint;
  totalAvailable: bigint;
  totalBorrows: bigint;
}> {
  let totalMarketSize = 0n;
  let totalBorrows = 0n;

  // Loop through each token and accumulate market data
  for (const token of tokens) {
    const marketData = (await getMarketData(token)) as MarketData;
    // Ensure that values are treated as BigInt
    totalMarketSize += marketData.totalSupply;
    totalBorrows += marketData.totalBorrow;
  }

  const totalAvailable = totalMarketSize - totalBorrows;

  return {
    totalMarketSize,
    totalAvailable,
    totalBorrows,
  };
}

// Get user net worth
export async function getUserNetWorth(user: string) {
  const netWorth = await publicClient.readContract({
    address: LENDING_POOL_ADDRESS,
    abi: LENDING_POOL_ABI,
    functionName: "getUserNetWorth",
    args: [user],
  });
  return netWorth;
}

// Get user supply shares for a given token
export async function getUserSupplyShares(user: string, token: string) {
  const shares = await publicClient.readContract({
    address: LENDING_POOL_ADDRESS,
    abi: LENDING_POOL_ABI,
    functionName: "getUserSupplyShares",
    args: [user, token],
  });
  return shares;
}

// Get user collateral amount for a given token
export async function getUserCollateral(user: string, token: string) {
  const collateral = await publicClient.readContract({
    address: LENDING_POOL_ADDRESS,
    abi: LENDING_POOL_ABI,
    functionName: "getUserCollateral",
    args: [user, token],
  });
  return collateral;
}

// Get user borrow shares for a given token
export async function getUserBorrowShares(user: string, token: string) {
  const shares = await publicClient.readContract({
    address: LENDING_POOL_ADDRESS,
    abi: LENDING_POOL_ABI,
    functionName: "getUserBorrowShares",
    args: [user, token],
  });
  return shares;
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
    chain: mantaSepoliaTestnet,
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
    chain: mantaSepoliaTestnet,
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
    chain: mantaSepoliaTestnet,
    address: LENDING_POOL_ADDRESS,
    abi: LENDING_POOL_ABI,
    functionName: "borrow",
    args: [token, amount],
  });
  return hash;
}

// Withdraw supplied tokens (by specifying the number of supply shares to redeem)
export async function withdraw(
  token: string,
  shares: bigint,
  walletClient: WalletClient,
  account: Address,
) {
  const hash = await walletClient.writeContract({
    account,
    chain: mantaSepoliaTestnet,
    address: LENDING_POOL_ADDRESS,
    abi: LENDING_POOL_ABI,
    functionName: "withdraw",
    args: [token, shares],
  });
  return hash;
}

// Withdraw collateral (by specifying the token amount)
export async function withdrawCollateral(
  token: string,
  amount: bigint,
  walletClient: WalletClient,
  account: Address,
) {
  const hash = await walletClient.writeContract({
    account,
    chain: mantaSepoliaTestnet,
    address: LENDING_POOL_ADDRESS,
    abi: LENDING_POOL_ABI,
    functionName: "withdrawCollateral",
    args: [token, amount],
  });
  return hash;
}

// Repay a borrowed token (by providing the borrow share amount)
export async function repay(
  token: string,
  shares: bigint,
  walletClient: WalletClient,
  account: Address,
) {
  const hash = await walletClient.writeContract({
    account,
    chain: mantaSepoliaTestnet,
    address: LENDING_POOL_ADDRESS,
    abi: LENDING_POOL_ABI,
    functionName: "repay",
    args: [token, shares],
  });
  return hash;
}
