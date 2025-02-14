import { Address } from "viem";

export interface IToken {
  name: string;
  symbol: string;
  address: Address;
  image: string;
}

export interface IAssetItem {
  token: IToken;
  totalSupplied?: bigint;
  supplyApy?: bigint;
  totalBorrowed?: bigint;
  borrowApy?: bigint;
  action?: {
    supply?: () => void;
    borrow?: () => void;
  };
}

export interface IYourSuppliesItem {
  token: IToken;
  balance?: number;
  apy?: number;
  withdraw?: () => void;
}

export interface IYourBorrowsItem {
  token: IToken;
  debt?: number;
  apy?: number;
  repay?: () => void;
}

export type quickAddPercentageType = 25 | 50 | 75 | 100;
export const quickAddPercentage: quickAddPercentageType[] = [25, 50, 75, 100];

export type MarketData = {
  totalSupply: bigint;
  totalBorrow: bigint;
  supplyApy: bigint;
  borrowApy: bigint;
};
