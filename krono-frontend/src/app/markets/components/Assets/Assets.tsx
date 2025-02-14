"use client";
import React, { useEffect, useState } from "react";

import { AssetList } from "@/constant";
import useWindowSize from "@/hooks/useWindowSize";
import { IAssetItem } from "@/types";

import useLendBorrow from "../../hooks/useLendBorrow";
import BorrowModal from "../ActionModal/BorrowModal";
import SupplyModal from "../ActionModal/SupplyModal";

import AssetCard from "./AssetCard";
import AssetHeader from "./AssetHeader";
import AssetItem from "./AssetItem";

const Assets = () => {
  const { fetchAvailableAssets } = useLendBorrow();
  const { width } = useWindowSize();

  const [assets, setAssets] = useState<Record<AssetList, IAssetItem> | null>(
    null,
  );

  useEffect(() => {
    const loadAssets = async () => {
      try {
        const availableAssets = await fetchAvailableAssets();
        setAssets(availableAssets);
      } catch (error) {
        console.error(error);
      }
    };

    loadAssets();
  }, []);

  if (!assets) return <div>No assets available</div>;

  return (
    <section className="space-y-3">
      <h3 className="font-medium md:text-lg">Available Assets</h3>
      {width > 1024 ? (
        <>
          <AssetHeader />
          {Object.values(assets).map((asset) => (
            <AssetItem key={asset.token.name} asset={asset} />
          ))}
        </>
      ) : (
        <>
          {Object.values(assets).map((asset) => (
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
