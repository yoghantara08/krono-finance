import { useDispatch, useSelector } from "react-redux";

import { ASSET_LIST, AssetList } from "@/constant";
import {
  setBorrowAssetItem,
  setLendAssetItem,
} from "@/redux/reducers/lendBorrowSlice";
import { setBorrowModal, setSupplyModal } from "@/redux/reducers/modalSlice";
import { RootState } from "@/redux/store";
import { IAssetItem } from "@/types";

const useLendBorrow = () => {
  const { lendAssetItem, borrowAssetItem } = useSelector(
    (state: RootState) => state.lendBorrow,
  );
  const { supplyModal, borrowModal } = useSelector(
    (state: RootState) => state.modal,
  );
  const dispatch = useDispatch();

  const updateLendAssetItem = (assetItem: IAssetItem) => {
    dispatch(setLendAssetItem(assetItem));
  };

  const updateBorrowAssetItem = (assetItem: IAssetItem) => {
    dispatch(setBorrowAssetItem(assetItem));
  };

  const openSupplyModal = () => dispatch(setSupplyModal(true));
  const closeSupplyModal = () => dispatch(setSupplyModal(false));

  const openBorrowModal = () => dispatch(setBorrowModal(true));
  const closeBorrowModal = () => dispatch(setBorrowModal(false));

  const AVAILABLE_ASSETS: Record<AssetList, IAssetItem> = {
    USDC: {
      token: ASSET_LIST.USDC,
      totalSupplied: 15000,
      supplyApy: 5,
      totalBorrowed: 15000,
      borrowApy: 3,
      action: {
        supply: () => {
          openSupplyModal();
        },
        borrow: () => {
          openBorrowModal();
        },
      },
    },
    USDT: {
      token: ASSET_LIST.USDT,
      totalSupplied: 14500,
      supplyApy: 5,
      totalBorrowed: 14500,
      borrowApy: 2,
      action: {
        supply: () => {
          openSupplyModal();
        },
        borrow: () => {
          openBorrowModal();
        },
      },
    },
    WBTC: {
      token: ASSET_LIST.WBTC,
      totalSupplied: 5,
      supplyApy: 0,
      totalBorrowed: 0,
      borrowApy: 0,
      action: {
        supply: () => {
          openSupplyModal();
        },
      },
    },
    WETH: {
      token: ASSET_LIST.WETH,
      totalSupplied: 5,
      supplyApy: 0,
      totalBorrowed: 0,
      borrowApy: 0,
      action: {
        supply: () => {
          openSupplyModal();
        },
      },
    },
  };

  return {
    AVAILABLE_ASSETS,
    lendAssetItem,
    borrowAssetItem,
    supplyModal,
    borrowModal,
    updateBorrowAssetItem,
    updateLendAssetItem,
    openSupplyModal,
    closeSupplyModal,
    openBorrowModal,
    closeBorrowModal,
  };
};

export default useLendBorrow;
