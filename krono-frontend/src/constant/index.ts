import { IToken } from "@/types";

export const PROJECT_ID =
  process.env.NEXT_PUBLIC_RAINBOW_KIT_PROJECT_ID ??
  "YOUR RAINBOW KIT PROJECT ID";

export const LENDING_POOL_ADDRESS =
  "0xE7cca31DFB970fFBF436Deba7fbB8FD474930641";

export const TEST_USDC = "0x47a347287D6178591208c6681fD4c7bffd9DA6fB";
export const TEST_USDT = "0x2F2DD40B0111fe8659d1B7e36BaB815480075167";
export const TEST_WBTC = "0xAc69Dc846063E0C0cefec2036a84FeF9A4a7061a";
export const TEST_MANTA = "0x77f0bd951088fE4b8Cd756F1a0E0fc904C5eC981";

export type AssetList = "USDC" | "USDT" | "WBTC" | "MANTA";

export const ASSET_LIST: Record<AssetList, IToken> = {
  USDC: {
    name: "USD Coin",
    symbol: "USDC",
    address: TEST_USDC,
    image: "/tokens/usdc.png",
  },
  USDT: {
    name: "Tether USD",
    symbol: "USDT",
    address: TEST_USDT,
    image: "/tokens/usdt.png",
  },
  MANTA: {
    name: "Manta Network",
    symbol: "MANTA",
    address: TEST_MANTA,
    image: "/tokens/manta.png",
  },
  WBTC: {
    name: "Wrapped Bitcoin",
    symbol: "WBTC",
    address: TEST_WBTC,
    image: "/tokens/wbtc.png",
  },
};
