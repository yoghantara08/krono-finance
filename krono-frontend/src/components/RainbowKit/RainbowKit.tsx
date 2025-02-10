import { ReactNode } from "react";

import { RainbowKitProvider, Theme } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

import wagmiConfig from "@/config/wagmiConfig";

import "@rainbow-me/rainbowkit/styles.css";

const queryClient = new QueryClient();

const customTheme: Theme = {
  blurs: {
    modalOverlay: "8px",
  },
  colors: {
    accentColor: "#4680FE",
    accentColorForeground: "#FFFFFF",
    actionButtonBorder: "#2C2C2C",
    actionButtonBorderMobile: "#333333",
    actionButtonSecondaryBackground: "#2A2A2A",
    closeButton: "#B8B9BD",
    closeButtonBackground: "#1A1A1A",
    connectButtonBackground: "#4680FE",
    connectButtonBackgroundError: "#FC4A71",
    connectButtonInnerBackground: "#5490FF",
    connectButtonText: "#FFFFFF",
    connectButtonTextError: "#FFFFFF",
    connectionIndicator: "#31DBB1",
    downloadBottomCardBackground: "#1A1A1A",
    downloadTopCardBackground: "#2A2A2A",
    error: "#FC4A71",
    generalBorder: "#2C2C2C",
    generalBorderDim: "#404040",
    menuItemBackground: "#2A2A2A",
    modalBackdrop: "rgba(0, 0, 0, 0.75)",
    modalBackground: "#1A1A1A",
    modalBorder: "#2C2C2C",
    modalText: "#FFFFFF",
    modalTextDim: "#B8B9BD",
    modalTextSecondary: "#5E5E5E",
    profileAction: "#2A2A2A",
    profileActionHover: "#3647A8",
    profileForeground: "#1A1A1A",
    selectedOptionBorder: "#4680FE",
    standby: "#FFDC30",
  },
  fonts: {
    body: "Inter, sans-serif",
  },
  radii: {
    actionButton: "8px",
    connectButton: "8px",
    menuButton: "8px",
    modal: "12px",
    modalMobile: "12px",
  },
  shadows: {
    connectButton: "0px 4px 10px rgba(0, 0, 0, 0.25)",
    dialog: "0px 10px 20px rgba(0, 0, 0, 0.3)",
    profileDetailsAction: "0px 2px 5px rgba(0, 0, 0, 0.2)",
    selectedOption: "0px 0px 6px rgba(70, 90, 213, 0.6)",
    selectedWallet: "0px 0px 10px rgba(70, 90, 213, 0.8)",
    walletLogo: "0px 2px 4px rgba(0, 0, 0, 0.2)",
  },
};

const RainbowKit = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={customTheme}>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default RainbowKit;
