import React from "react";

import Image from "next/image";

import BigNumber from "bignumber.js";

import Button from "@/components/Button/Button";

import useLendBorrow from "../../hooks/useLendBorrow";

import { AssetItemProps } from "./AssetItem";

const AssetCard = ({ asset }: AssetItemProps) => {
  const { token, action, borrowApy, supplyApy, totalBorrowed, totalSupplied } =
    asset;

  const { updateLendAssetItem, updateBorrowAssetItem } = useLendBorrow();

  const bnTotalSupplied = BigNumber(totalSupplied || "0").div(
    BigNumber(10).pow(18),
  );
  const bnTotalBorrowed = BigNumber(totalBorrowed || "0").div(
    BigNumber(10).pow(18),
  );

  const usdValue = bnTotalSupplied.times(token.price).toFixed(2).toString();
  const borrowUsdValue = bnTotalBorrowed
    .times(token.price)
    .toFixed(2)
    .toString();

  return (
    <div className="w-full space-y-4 rounded-md border bg-surface p-3">
      <div className="flex gap-1.5">
        <Image src={token.image} alt={token.name} width={40} height={40} />
        <div>
          <p>{token.name}</p>
          <p className="text-xs text-secondary">{token.symbol}</p>
        </div>
      </div>

      <div className="space-y-2 border-b pb-2 text-sm">
        <div className="flex items-center justify-between">
          <p>Total Supplied</p>

          <div className="text-end">
            <p>{(Number(totalSupplied) / 10 ** 18).toFixed(2) || "-"}</p>
            <p className="text-xs text-secondary">
              ${BigNumber(usdValue).toFormat()}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p>Supply APY</p>
          <p className="text-base">{supplyApy ? `${supplyApy}%` : "-"}</p>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between text-end">
          <p>Total Borrowed</p>

          <div>
            <p>{(Number(totalBorrowed) / 10 ** 18).toFixed(2) || "-"}</p>
            <p className="text-xs text-secondary">
              ${BigNumber(borrowUsdValue).toFormat()}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p>Borrow APY</p>
          <p className="text-base">{borrowApy ? `${borrowApy}%` : "-"}</p>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex items-center gap-3">
        {action?.supply && (
          <Button
            className="h-9 w-full text-sm"
            onClick={() => {
              if (action.supply) action.supply();
              updateLendAssetItem(asset);
            }}
          >
            Supply
          </Button>
        )}
        {action?.borrow && (
          <Button
            className="h-9 w-full text-sm"
            variant="secondary"
            onClick={() => {
              if (action.borrow) action.borrow();
              updateBorrowAssetItem(asset);
            }}
          >
            Borrow
          </Button>
        )}
      </div>
    </div>
  );
};

export default AssetCard;
