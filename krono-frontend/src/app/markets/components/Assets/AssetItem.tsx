import React from "react";

import Image from "next/image";

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

  const usdValue =
    (Number(totalSupplied) / 10 ** 18) * (Number(token.price) / 10 ** 18);
  const borrowUsdValue =
    (Number(totalBorrowed) / 10 ** 18) * (Number(token.price) / 10 ** 18);

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
        <p>{(Number(totalSupplied) / 10 ** 18).toFixed(2) || "-"}</p>
        <p className="text-xs text-secondary">${usdValue.toLocaleString()}</p>
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
            <p>{(Number(totalBorrowed) / 10 ** 18).toFixed(2) || "-"}</p>
            <p className="text-xs text-secondary">
              ${borrowUsdValue.toLocaleString()}
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
