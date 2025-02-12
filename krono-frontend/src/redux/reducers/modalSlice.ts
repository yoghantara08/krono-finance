import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface modalState {
  supplyModal: boolean;
  borrowModal: boolean;
}

const initialState: modalState = {
  supplyModal: false,
  borrowModal: false,
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
  },
});

export const { setSupplyModal, setBorrowModal } = modalSlice.actions;
const modalReducer = modalSlice.reducer;

export default modalReducer;
