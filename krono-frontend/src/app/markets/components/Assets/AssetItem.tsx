import React from "react";

import Image from "next/image";

import BigNumber from "bignumber.js";

import Button from "@/components/Button/Button";
import { IAssetItem } from "@/types";

import useLendBorrow from "../../hooks/useLendBorrow";

import { ASSET_COLUMNS } from "./AssetHeader";

export interface AssetItemProps {
  asset: IAssetItem;
}

const AssetItem = ({ asset }: AssetItemProps) => {
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
    <div className="flex w-full items-center rounded-lg border bg-surface px-5 py-3">
      {/* ASSET/TOKEN */}
      <div
        className="flex items-center gap-2"
        style={{ width: ASSET_COLUMNS.ASSET.width }}
      >
        <Image src={token.image} alt={token.name} width={32} height={32} />
        <div>
          <p>{token.name}</p>
          <p className="text-xs text-secondary">{token.symbol}</p>
        </div>
      </div>

      {/* TOTAL SUPPLIED */}
      <div
        className="text-center"
        style={{ width: ASSET_COLUMNS.TOTAL_SUPPLIED.width }}
      >
        <p>{bnTotalSupplied.toFixed(2).toString()}</p>
        <p className="text-xs text-secondary">
          ${BigNumber(usdValue).toFormat()}
        </p>
      </div>

      {/* SUPPLY APY */}
      <p
        className="text-center font-medium"
        style={{ width: ASSET_COLUMNS.SUPPLY_APY.width }}
      >
        {supplyApy ? `${supplyApy}%` : "-"}
      </p>

      {/* TOTAL BORROWED */}
      <div
        className="text-center"
        style={{ width: ASSET_COLUMNS.TOTAL_BORROWED.width }}
      >
        {token.symbol === "USDC" || token.symbol === "USDT" ? (
          <>
            <p>{bnTotalBorrowed.toFixed(2).toString()}</p>
            <p className="text-xs text-secondary">
              ${BigNumber(borrowUsdValue).toFormat()}
            </p>{" "}
          </>
        ) : (
          "-"
        )}
      </div>

      {/* BORROW APY */}
      <p
        className="text-center font-medium"
        style={{ width: ASSET_COLUMNS.BORROW_APY.width }}
      >
        {borrowApy && (token.symbol === "USDC" || token.symbol === "USDT")
          ? `${borrowApy}%`
          : "-"}
      </p>

      {/* ACTIONS */}
      <div
        className="flex items-center justify-end gap-3"
        style={{ width: ASSET_COLUMNS.ACTIONS.width }}
      >
        {action?.supply && (
          <Button
            className="h-9 text-sm"
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
            className="h-9 text-sm"
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

export default AssetItem;
