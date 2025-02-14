import {
  Address,
  createPublicClient,
  http,
  PublicClient,
  WalletClient,
} from "viem";
import { mantaSepoliaTestnet } from "viem/chains";

import {
  ASSET_LIST,
  LENDING_POOL_ADDRESS,
  PRICE_ORACLE_ADDRESS,
} from "@/constant";
import LENDING_POOL_ABI from "@/lib/abi/LendingPoolABI.json";
import PRICE_ORACLE_ABI from "@/lib/abi/PriceOracleABI.json";
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
  let totalAvailable = 0n;
  let totalBorrows = 0n;

  // Loop through each token and accumulate market data with price calculations
  for (const token of tokens) {
    const marketData = (await getMarketData(token)) as MarketData;

    // Get token price based on token address
    let tokenPrice = 0n;
    if (token === ASSET_LIST.MANTA.address) {
      tokenPrice = ASSET_LIST.MANTA.price;
    } else if (token === ASSET_LIST.USDC.address) {
      tokenPrice = ASSET_LIST.USDC.price;
    } else if (token === ASSET_LIST.USDT.address) {
      tokenPrice = ASSET_LIST.USDT.price;
    } else if (token === ASSET_LIST.WBTC.address) {
      tokenPrice = ASSET_LIST.WBTC.price;
    }

    // Calculate USD value for total market size
    const supplyInUsd = (marketData.totalSupply * tokenPrice) / BigInt(1e18);
    totalMarketSize += supplyInUsd;

    // Only calculate available and borrows for USDC and USDT
    if (
      token === ASSET_LIST.USDC.address ||
      token === ASSET_LIST.USDT.address
    ) {
      const borrowInUsd = (marketData.totalBorrow * tokenPrice) / BigInt(1e18);
      totalBorrows += borrowInUsd;
      totalAvailable += supplyInUsd - borrowInUsd;
    }
  }

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

export async function getTokenPrice(token: Address) {
  const price = await publicClient.readContract({
    address: PRICE_ORACLE_ADDRESS,
    abi: PRICE_ORACLE_ABI,
    functionName: "getTokenPrice",
    args: [token],
  });
  return price;
}

export async function setTokenPrice(
  token: Address,
  price: bigint,
  walletClient: WalletClient,
  account: Address,
) {
  await walletClient.writeContract({
    account,
    chain: mantaSepoliaTestnet,
    address: PRICE_ORACLE_ADDRESS,
    abi: PRICE_ORACLE_ABI,
    functionName: "setTokenPrice",
    args: [token, price],
  });
}
