import { IToken } from "@/types";

export const PROJECT_ID =
  process.env.NEXT_PUBLIC_RAINBOW_KIT_PROJECT_ID ??
  "YOUR RAINBOW KIT PROJECT ID";

export const LENDING_POOL_ADDRESS =
  "0x0192b7461AB56cb1D3dAdd137128ADcBeBBd5465";

export const TEST_USDC = "0xF242275d3a6527d877f2c927a82D9b057609cc71";
export const TEST_USDT = "0x05D032ac25d322df992303dCa074EE7392C117b9";
export const TEST_WBTC = "0x03C7054BCB39f7b2e5B2c7AcB37583e32D70Cfa3";

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
  WBTC: {
    name: "Wrapped Bitcoin",
    symbol: "WBTC",
    address: TEST_WBTC,
    image: "/tokens/wbtc.png",
    price: "95000",
  },
};
