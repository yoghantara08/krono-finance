import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mantaSepoliaTestnet } from "wagmi/chains";



import "@rainbow-me/rainbowkit/styles.css";
import { PROJECT_ID } from "@/constant";

const wagmiConfig = getDefaultConfig({
  appName: "KronoFinance",
  projectId: PROJECT_ID,
  chains: [mantaSepoliaTestnet],
  ssr: true,
});

export default wagmiConfig;
