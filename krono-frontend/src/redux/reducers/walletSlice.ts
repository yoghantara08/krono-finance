import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WalletState {
  waddress: string;
}

const initialState: WalletState = {
  waddress: "",
};

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<string>) => {
      state.waddress = action.payload;
    },
  },
});

export const { setAddress } = walletSlice.actions;
const walletReducer = walletSlice.reducer;

export default walletReducer;
