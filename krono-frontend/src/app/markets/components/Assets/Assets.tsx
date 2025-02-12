import React from "react";

import AssetHeader from "./AssetHeader";
import AssetItem, { AssetItemProps } from "./AssetItem";

const Assets = () => {
  const dummy: AssetItemProps[] = [
    {
      token: {
        name: "USD Coin",
        symbol: "USDC",
        address: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
        image: "/tokens/usdc.png",
      },
      totalSupplied: 15000,
      supplyApy: 5,
      totalBorrowed: 15000,
      borrowApy: 3,
      action: {
        supply: () => {},
        borrow: () => {},
      },
    },
    {
      token: {
        name: "Tether USD",
        symbol: "USDT",
        address: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
        image: "/tokens/usdt.png",
      },
      totalSupplied: 14500,
      supplyApy: 5,
      totalBorrowed: 14500,
      borrowApy: 2,
      action: {
        supply: () => {},
        borrow: () => {},
      },
    },
    {
      token: {
        name: "Wrapped Bitcoin",
        symbol: "WBTC",
        address: "",
        image: "/tokens/wbtc.png",
      },
      totalSupplied: 5,
      supplyApy: 0,
      totalBorrowed: 0,
      borrowApy: 0,
      action: {
        supply: () => {},
      },
    },
    {
      token: {
        name: "Wrapped Ethereum",
        symbol: "WETH",
        address: "",
        image: "/tokens/weth.png",
      },
      totalSupplied: 5,
      supplyApy: 0,
      totalBorrowed: 0,
      borrowApy: 0,
      action: {
        supply: () => {},
      },
    },
  ];

  return (
    <section className="space-y-3">
      <AssetHeader />
      {dummy.map((item) => (
        <AssetItem key={item.token.name} {...item} />
      ))}
    </section>
  );
};

export default Assets;
