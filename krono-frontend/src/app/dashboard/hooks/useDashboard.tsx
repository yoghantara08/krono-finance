import { useDispatch, useSelector } from "react-redux";

import {
  setRepayAssetItem,
  setWithdrawAssetItem,
} from "@/redux/reducers/lendBorrowSlice";
import { setRepayModal, setWithdrawModal } from "@/redux/reducers/modalSlice";
import { RootState } from "@/redux/store";
import { IYourBorrowsItem, IYourSuppliesItem } from "@/types";

const useDashboard = () => {
  const { wihtdrawAssetItem, repayAssetItem } = useSelector(
    (state: RootState) => state.lendBorrow,
  );
  const { withdrawModal, repayModal } = useSelector(
    (state: RootState) => state.modal,
  );
  const dispatch = useDispatch();

  const updateWithdrawAssetItem = (assetItem: IYourSuppliesItem) => {
    dispatch(setWithdrawAssetItem(assetItem));
  };

  const updateRepayAssetItem = (assetItem: IYourBorrowsItem) => {
    dispatch(setRepayAssetItem(assetItem));
  };

  const openWithdrawModal = () => dispatch(setWithdrawModal(true));
  const closeWithdrawModal = () => dispatch(setWithdrawModal(false));

  const openRepayModal = () => dispatch(setRepayModal(true));
  const closeRepayModal = () => dispatch(setRepayModal(false));

  return {
    wihtdrawAssetItem,
    repayAssetItem,
    withdrawModal,
    repayModal,
    openWithdrawModal,
    closeWithdrawModal,
    openRepayModal,
    closeRepayModal,
    updateWithdrawAssetItem,
    updateRepayAssetItem,
  };
};

export default useDashboard;
