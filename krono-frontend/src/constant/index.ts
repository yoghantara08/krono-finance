import { IToken } from "@/types";

export const PROJECT_ID =
  process.env.NEXT_PUBLIC_RAINBOW_KIT_PROJECT_ID ??
  "YOUR RAINBOW KIT PROJECT ID";

export type AssetList = "USDC" | "USDT" | "WBTC" | "WETH";

export const ASSET_LIST: Record<AssetList, IToken> = {
  USDC: {
    name: "USD Coin",
    symbol: "USDC",
    address: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    image: "/tokens/usdc.png",
  },
  USDT: {
    name: "Tether USD",
    symbol: "USDT",
    address: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
    image: "/tokens/usdt.png",
  },
  WBTC: {
    name: "Wrapped Bitcoin",
    symbol: "WBTC",
    address: "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6",
    image: "/tokens/wbtc.png",
  },
  WETH: {
    name: "Wrapped Ethereum",
    symbol: "WETH",
    address: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619",
    image: "/tokens/weth.png",
  },
};
