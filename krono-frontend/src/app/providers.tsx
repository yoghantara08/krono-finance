"use client";

import React from "react";
import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";

import RainbowKit from "@/components/RainbowKit/RainbowKit";
import { persistor, store } from "@/redux/store";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RainbowKit>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    </RainbowKit>
  );
}
