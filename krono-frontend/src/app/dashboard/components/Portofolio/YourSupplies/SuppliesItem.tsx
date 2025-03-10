import React from "react";

import Image from "next/image";

import BigNumber from "bignumber.js";

import Button from "@/components/Button/Button";
import { IYourSuppliesItem } from "@/types";

import { YOUR_SUPPLIES_COLUMNS } from "./YourSupplies";

interface SuppliesItemProps {
  asset: IYourSuppliesItem;
}

const SuppliesItem = ({ asset }: SuppliesItemProps) => {
  const { token, balance, apy, withdraw } = asset;

  return (
    <div className="flex w-full items-center p-4">
      {/* ASSET/TOKEN */}
      <div
        className="flex items-center gap-2"
        style={{ width: YOUR_SUPPLIES_COLUMNS.ASSET.width }}
      >
        <Image src={token.image} alt={token.name} width={32} height={32} />
        <div>
          <p className="text-sm">{token.name}</p>
          <p className="text-xs text-secondary">{token.symbol}</p>
        </div>
      </div>

      {/* BALANCE */}
      <div
        className="text-center"
        style={{ width: YOUR_SUPPLIES_COLUMNS.BALANCE.width }}
      >
        <p>{balance ?? "-"}</p>
        <p className="text-xs text-secondary">
          $
          {token.symbol === "WBTC"
            ? BigNumber(balance || "0")
                .times("95000")
                .toFormat()
            : balance}
        </p>
      </div>

      {/* SUPPLY APY */}
      <p
        className="text-center font-medium"
        style={{ width: YOUR_SUPPLIES_COLUMNS.SUPPLY_APY.width }}
      >
        {apy ? `${apy}%` : "-"}
      </p>

      <Button className="ml-auto h-9 text-sm" onClick={withdraw}>
        Withdraw
      </Button>
    </div>
  );
};

export default SuppliesItem;
