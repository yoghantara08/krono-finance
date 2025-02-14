import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { persistStore } from "redux-persist";
import autoMergeLevel1 from "redux-persist/lib/stateReconciler/autoMergeLevel1";

import lendBorrowReducer from "./reducers/lendBorrowSlice";
import modalReducer from "./reducers/modalSlice";
import walletReducer from "./reducers/walletSlice";
import storage from "./storage";

const persistConfig = {
  key: "krono_finance_state",
  storage,
  stateReconciler: autoMergeLevel1,
  blacklist: ["modal", "lendBorrow"],
};

const rootReducer = combineReducers({
  wallet: walletReducer,
  lendBorrow: lendBorrowReducer,
  modal: modalReducer,
});

type RootReducerType = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer<RootReducerType>(
  persistConfig,
  rootReducer,
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);

export { persistor, store };
export type { AppDispatch, RootState };
