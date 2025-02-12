import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IAssetItem } from "@/types";

interface LendBorrowState {
  lendAssetItem: IAssetItem;
  borrowAssetItem: IAssetItem;
}

const initialState: LendBorrowState = {
  lendAssetItem: {
    token: {
      name: "",
      symbol: "",
      address: "",
      image: "",
    },
  },
  borrowAssetItem: {
    token: {
      name: "",
      symbol: "",
      address: "",
      image: "",
    },
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
  },
});

export const { setBorrowAssetItem, setLendAssetItem } = lendBorrowSlice.actions;
const lendBorrowReducer = lendBorrowSlice.reducer;

export default lendBorrowReducer;
