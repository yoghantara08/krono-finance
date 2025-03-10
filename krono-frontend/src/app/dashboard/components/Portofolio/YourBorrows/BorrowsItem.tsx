import React from "react";

import Image from "next/image";

import Button from "@/components/Button/Button";
import { formatCurrency } from "@/lib/utils";
import { IYourBorrowsItem } from "@/types";

import { YOUR_BORROWS_COLUMNS } from "./YourBorrows";

interface BorrowsItemProps {
  asset: IYourBorrowsItem;
}

const BorrowsItem = ({ asset }: BorrowsItemProps) => {
  const { token, debt, apy, repay } = asset;

  return (
    <div className="flex w-full items-center p-4">
      {/* ASSET/TOKEN */}
      <div
        className="flex items-center gap-2"
        style={{ width: YOUR_BORROWS_COLUMNS.ASSET.width }}
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
        style={{ width: YOUR_BORROWS_COLUMNS.DEBT.width }}
      >
        <p>{debt ?? "-"}</p>
        <p className="text-xs text-secondary">{formatCurrency(debt || "0")}</p>
      </div>

      {/* SUPPLY APY */}
      <p
        className="text-center font-medium"
        style={{ width: YOUR_BORROWS_COLUMNS.SUPPLY_APY.width }}
      >
        {apy ? `${apy}%` : "-"}
      </p>

      <Button className="ml-auto h-9 text-sm" onClick={repay}>
        Repay
      </Button>
    </div>
  );
};

export default BorrowsItem;
