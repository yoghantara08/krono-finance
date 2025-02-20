import { Address } from "viem";

export interface IToken {
  name: string;
  symbol: string;
  address: Address;
  image: string;
  price: string;
}

export interface IAssetItem {
  token: IToken;
  totalSupplied?: string;
  supplyApy?: string;
  totalBorrowed?: string;
  borrowApy?: string;
  action?: {
    supply?: () => void;
    borrow?: () => void;
  };
}

export interface IYourSuppliesItem {
  token: IToken;
  balance?: string;
  apy?: string;
  withdraw?: () => void;
}

export interface IYourBorrowsItem {
  token: IToken;
  debt?: string;
  apy?: string;
  repay?: () => void;
}

export type quickAddPercentageType = 25 | 50 | 75 | 100;
export const quickAddPercentage: quickAddPercentageType[] = [25, 50, 75, 100];

export type MarketData = {
  totalSupply: string;
  totalBorrow: string;
  supplyApy: string;
  borrowApy: string;
};
