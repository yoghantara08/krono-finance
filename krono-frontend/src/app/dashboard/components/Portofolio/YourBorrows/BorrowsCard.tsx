import React from "react";

import Image from "next/image";

import Button from "@/components/Button/Button";
import { IYourBorrowsItem } from "@/types";

const BorrowsCard = ({ token, debt, apy, repay }: IYourBorrowsItem) => {
  return (
    <div className="mt-2 space-y-3 border-t px-3 py-4">
      <div className="flex gap-1.5">
        <Image src={token.image} alt={token.name} width={40} height={40} />
        <div>
          <p>{token.name}</p>
          <p className="text-xs text-secondary">{token.symbol}</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <p>Balance</p>
        <div>
          <p>{debt ?? "-"}</p>
          <p className="text-xs text-secondary">${debt}</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <p>Borrow APY</p>
        <p className="text-base">{apy ? `${apy}%` : "-"}</p>
      </div>

      <Button className="h-9 w-full text-sm" onClick={repay}>
        Repay
      </Button>
    </div>
  );
};

export default BorrowsCard;
