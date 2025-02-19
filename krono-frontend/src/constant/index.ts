import { IToken } from "@/types";

export const PROJECT_ID =
  process.env.NEXT_PUBLIC_RAINBOW_KIT_PROJECT_ID ??
  "YOUR RAINBOW KIT PROJECT ID";

export const LENDING_POOL_ADDRESS =
  "0x9295567A267f252a11387cc23809Cd0FC65DF260";
export const PRICE_ORACLE_ADDRESS =
  "0xa1b13cBdfC252CBE586295A1ca832C184d782bde";
export const TOKEN_FAUCET_ADDRESS =
  "0x902BF525B7aEcb9AeBfc8A0c5F320b5f70ab7096";

export const TEST_USDC = "0x47a347287D6178591208c6681fD4c7bffd9DA6fB";
export const TEST_USDT = "0x2F2DD40B0111fe8659d1B7e36BaB815480075167";
export const TEST_WBTC = "0xAc69Dc846063E0C0cefec2036a84FeF9A4a7061a";
export const TEST_MANTA = "0x77f0bd951088fE4b8Cd756F1a0E0fc904C5eC981";

export type AssetList = "USDC" | "USDT" | "WBTC";

export const ASSET_LIST: Record<AssetList, IToken> = {
  USDC: {
    name: "USD Coin",
    symbol: "USDC",
    address: TEST_USDC,
    image: "/tokens/usdc.png",
    price: "1",
  },
  USDT: {
    name: "Tether USD",
    symbol: "USDT",
    address: TEST_USDT,
    image: "/tokens/usdt.png",
    price: "1",
  },
  // MANTA: {
  //   name: "Manta Network",
  //   symbol: "MANTA",
  //   address: TEST_MANTA,
  //   image: "/tokens/manta.png",
  //   price: BigInt(Math.floor(0.42 * 10 ** 18)),
  // },
  WBTC: {
    name: "Wrapped Bitcoin",
    symbol: "WBTC",
    address: TEST_WBTC,
    image: "/tokens/wbtc.png",
    price: "95000",
  },
};
