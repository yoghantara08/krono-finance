export interface IToken {
  name: string;
  symbol: string;
  address: string;
  image: string;
}

export interface IAssetItem {
  token: IToken;
  totalSupplied?: number;
  supplyApy?: number;
  totalBorrowed?: number;
  borrowApy?: number;
  action?: {
    supply?: () => void;
    borrow?: () => void;
  };
}

export type quickAddPercentageType = 25 | 50 | 75 | 100;
export const quickAddPercentage: quickAddPercentageType[] = [25, 50, 75, 100];
