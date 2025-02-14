import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { createConfig, http } from "wagmi";
import { mantaSepoliaTestnet } from "wagmi/chains";

import { PROJECT_ID } from "@/constant";

import "@rainbow-me/rainbowkit/styles.css";

const wagmiConfig = getDefaultConfig({
  appName: "KronoFinance",
  projectId: PROJECT_ID,
  chains: [mantaSepoliaTestnet],
  ssr: true,
});

export const config = createConfig({
  chains: [mantaSepoliaTestnet],
  transports: {
    [mantaSepoliaTestnet.id]: http(),
  },
});

export default wagmiConfig;
