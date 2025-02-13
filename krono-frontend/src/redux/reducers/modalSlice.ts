import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface modalState {
  supplyModal: boolean;
  borrowModal: boolean;
  withdrawModal: boolean;
  repayModal: boolean;
}

const initialState: modalState = {
  supplyModal: false,
  borrowModal: false,
  withdrawModal: false,
  repayModal: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setSupplyModal: (state, action: PayloadAction<boolean>) => {
      state.supplyModal = action.payload;
    },
    setBorrowModal: (state, action: PayloadAction<boolean>) => {
      state.borrowModal = action.payload;
    },
    setWithdrawModal: (state, action: PayloadAction<boolean>) => {
      state.withdrawModal = action.payload;
    },
    setRepayModal: (state, action: PayloadAction<boolean>) => {
      state.repayModal = action.payload;
    },
  },
});

export const {
  setSupplyModal,
  setBorrowModal,
  setRepayModal,
  setWithdrawModal,
} = modalSlice.actions;
const modalReducer = modalSlice.reducer;

export default modalReducer;
