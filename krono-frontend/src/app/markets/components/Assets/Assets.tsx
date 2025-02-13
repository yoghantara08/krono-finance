"use client";
import React from "react";

import useWindowSize from "@/hooks/useWindowSize";

import useLendBorrow from "../../hooks/useLendBorrow";
import BorrowModal from "../ActionModal/BorrowModal";
import SupplyModal from "../ActionModal/SupplyModal";

import AssetCard from "./AssetCard";
import AssetHeader from "./AssetHeader";
import AssetItem from "./AssetItem";

const Assets = () => {
  const { AVAILABLE_ASSETS } = useLendBorrow();
  const { width } = useWindowSize();

  return (
    <section className="space-y-3">
      <h3 className="font-medium md:text-lg">Available Assets</h3>
      {width > 1024 ? (
        <>
          <AssetHeader />
          {Object.values(AVAILABLE_ASSETS).map((asset) => (
            <AssetItem key={asset.token.name} asset={asset} />
          ))}
        </>
      ) : (
        <>
          {Object.values(AVAILABLE_ASSETS).map((asset) => (
            <AssetCard key={asset.token.name} asset={asset} />
          ))}
        </>
      )}

      <SupplyModal />
      <BorrowModal />
    </section>
  );
};

export default Assets;
