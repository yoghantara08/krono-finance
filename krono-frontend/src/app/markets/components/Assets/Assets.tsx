"use client";
import React from "react";

import useLendBorrow from "../../hooks/useLendBorrow";
import SupplyModal from "../ActionModal/SupplyModal";

import AssetHeader from "./AssetHeader";
import AssetItem from "./AssetItem";

const Assets = () => {
  const { AVAILABLE_ASSETS } = useLendBorrow();

  return (
    <section className="space-y-3">
      <AssetHeader />
      {AVAILABLE_ASSETS.map((asset) => (
        <AssetItem key={asset.token.name} asset={asset} />
      ))}

      <SupplyModal />
    </section>
  );
};

export default Assets;
