import React from "react";

import Image from "next/image";

import Button from "@/components/Button/Button";
import { IYourSuppliesItem } from "@/types";

import { YOUR_SUPPLIES_COLUMNS } from "./YourSupplies";

const SuppliesItem = ({ token, balance, apy, withdraw }: IYourSuppliesItem) => {
  const formatCurrency = (value?: number) =>
    value ? `$${value.toLocaleString()}` : "-";

  return (
    <div className="flex w-full items-center p-4">
      {/* ASSET/TOKEN */}
      <div
        className="flex items-center gap-2"
        style={{ width: YOUR_SUPPLIES_COLUMNS.ASSET.width }}
      >
        <Image src={token.image} alt={token.name} width={32} height={32} />
        <div>
          <p>{token.name}</p>
          <p className="text-xs text-secondary">{token.symbol}</p>
        </div>
      </div>

      {/* BALANCE */}
      <div
        className="text-center"
        style={{ width: YOUR_SUPPLIES_COLUMNS.BALANCE.width }}
      >
        <p>{balance ?? "-"}</p>
        <p className="text-xs text-secondary">{formatCurrency(balance)}</p>
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
