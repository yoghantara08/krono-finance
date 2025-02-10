import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mantaSepoliaTestnet } from "wagmi/chains";

import { PROJECT_ID } from "@/constant";

import "@rainbow-me/rainbowkit/styles.css";

const wagmiConfig = getDefaultConfig({
  appName: "KronoFinance",
  projectId: PROJECT_ID,
  chains: [mantaSepoliaTestnet],
  ssr: true,
});

export default wagmiConfig;
