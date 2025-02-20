import { Address, WalletClient } from "viem";
import { lisk } from "viem/chains";

import { LENDING_POOL_ADDRESS } from "@/constant";
import LENDING_POOL_ABI from "@/lib/abi/LendingPoolABI.json";

import { publicClient } from "./lendingPoolService";

// Get user net worth
export async function getUserNetWorth(user: Address) {
  const netWorth = await publicClient.readContract({
    address: LENDING_POOL_ADDRESS,
    abi: LENDING_POOL_ABI,
    functionName: "getUserNetWorth",
    args: [user],
  });
  return netWorth;
}

// Get user supply shares for a given token
export async function getUserSupplyShares(user: Address, token: Address) {
  const shares = await publicClient.readContract({
    address: LENDING_POOL_ADDRESS,
    abi: LENDING_POOL_ABI,
    functionName: "getUserSupplyShares",
    args: [user, token],
  });
  return shares;
}

// Get user collateral amount for a given token
export async function getUserCollateral(user: Address, token: Address) {
  const collateral = await publicClient.readContract({
    address: LENDING_POOL_ADDRESS,
    abi: LENDING_POOL_ABI,
    functionName: "getUserCollateral",
    args: [user, token],
  });
  return collateral;
}

// Get user borrow shares for a given token
export async function getUserBorrowShares(user: Address, token: Address) {
  const shares = await publicClient.readContract({
    address: LENDING_POOL_ADDRESS,
    abi: LENDING_POOL_ABI,
    functionName: "getUserBorrowShares",
    args: [user, token],
  });
  return shares;
}

// Withdraw supplied tokens (by specifying the number of supply shares to redeem)
export async function withdraw(
  token: Address,
  shares: bigint,
  walletClient: WalletClient,
  account: Address,
) {
  const hash = await walletClient.writeContract({
    account,
    chain: lisk,
    address: LENDING_POOL_ADDRESS,
    abi: LENDING_POOL_ABI,
    functionName: "withdraw",
    args: [token, shares],
  });
  return hash;
}

// Withdraw collateral (by specifying the token amount)
export async function withdrawCollateral(
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
    chain: lisk,
    address: LENDING_POOL_ADDRESS,
    abi: LENDING_POOL_ABI,
    functionName: "repay",
    args: [token, shares],
  });
  return hash;
}
