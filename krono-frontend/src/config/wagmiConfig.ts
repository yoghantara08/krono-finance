import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mantaSepoliaTestnet } from "wagmi/chains";

import { PROJECT_ID } from "@/constant";

const wagmiConfig = getDefaultConfig({
  appName: "Krono Finance",
  projectId: PROJECT_ID,
  chains: [mantaSepoliaTestnet],
  ssr: true,
});

export default wagmiConfig;
