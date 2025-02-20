import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IAssetItem, IYourBorrowsItem, IYourSuppliesItem } from "@/types";

interface LendBorrowState {
  lendAssetItem: IAssetItem;
  borrowAssetItem: IAssetItem;
  wihtdrawAssetItem: IYourSuppliesItem;
  repayAssetItem: IYourBorrowsItem;
}

const initialState: LendBorrowState = {
  lendAssetItem: {
    token: {
      name: "",
      symbol: "",
      address: "0x",
      image: "",
      price: "0",
    },
  },
  borrowAssetItem: {
    token: {
      name: "",
      symbol: "",
      address: "0x",
      image: "",
      price: "0",
    },
  },
  wihtdrawAssetItem: {
    token: {
      name: "",
      symbol: "",
      address: "0x",
      image: "",
      price: "0",
    },
    balance: "0",
    apy: "0",
    withdraw: () => {},
  },
  repayAssetItem: {
    token: {
      name: "",
      symbol: "",
      address: "0x",
      image: "",
      price: "0",
    },
    debt: "0",
    apy: "0",
    repay: () => {},
  },
};

export const lendBorrowSlice = createSlice({
  name: "lendBorrow",
  initialState,
  reducers: {
    setLendAssetItem: (state, action: PayloadAction<IAssetItem>) => {
      state.lendAssetItem = action.payload;
    },
    setBorrowAssetItem: (state, action: PayloadAction<IAssetItem>) => {
      state.borrowAssetItem = action.payload;
    },
    setWithdrawAssetItem: (state, action: PayloadAction<IYourSuppliesItem>) => {
      state.wihtdrawAssetItem = action.payload;
    },
    setRepayAssetItem: (state, action: PayloadAction<IYourBorrowsItem>) => {
      state.repayAssetItem = action.payload;
    },
  },
});

export const {
  setBorrowAssetItem,
  setLendAssetItem,
  setRepayAssetItem,
  setWithdrawAssetItem,
} = lendBorrowSlice.actions;
const lendBorrowReducer = lendBorrowSlice.reducer;

export default lendBorrowReducer;
