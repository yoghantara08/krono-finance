import { useDispatch, useSelector } from "react-redux";

import { ASSET_LIST, AssetList } from "@/constant";
import { getMarketData } from "@/lib/services/lendingPoolService";
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

  // SERVICES
  const getTokenMarketData = async (token: AssetList) => {
    return await getMarketData(ASSET_LIST[token].address);
  };

  const fetchAvailableAssets = async (): Promise<
    Record<AssetList, IAssetItem>
  > => {
    // Fetch market data for all tokens concurrently
    const [USDCData, USDTData, MANTAData, WBTCData] = await Promise.all([
      getTokenMarketData("USDC"),
      getTokenMarketData("USDT"),
      getTokenMarketData("MANTA"),
      getTokenMarketData("WBTC"),
    ]);

    const AVAILABLE_ASSETS: Record<AssetList, IAssetItem> = {
      USDC: {
        token: ASSET_LIST.USDC,
        totalSupplied: USDCData.totalSupply,
        supplyApy: 6n,
        totalBorrowed: USDCData.totalBorrow,
        borrowApy: USDCData.borrowApy,
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
        totalSupplied: USDTData.totalSupply,
        supplyApy: 6n,
        totalBorrowed: USDTData.totalBorrow,
        borrowApy: USDTData.borrowApy,
        action: {
          supply: () => {
            openSupplyModal();
          },
          borrow: () => {
            openBorrowModal();
          },
        },
      },
      MANTA: {
        token: ASSET_LIST.MANTA,
        totalSupplied: MANTAData.totalSupply,
        supplyApy: MANTAData.supplyApy,
        totalBorrowed: MANTAData.totalBorrow,
        borrowApy: MANTAData.borrowApy,
        action: {
          supply: () => {
            openSupplyModal();
          },
        },
      },
      WBTC: {
        token: ASSET_LIST.WBTC,
        totalSupplied: WBTCData.totalSupply,
        supplyApy: WBTCData.supplyApy,
        totalBorrowed: WBTCData.totalBorrow,
        borrowApy: WBTCData.borrowApy,
        action: {
          supply: () => {
            openSupplyModal();
          },
        },
      },
    };

    return AVAILABLE_ASSETS;
  };

  return {
    fetchAvailableAssets,
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
