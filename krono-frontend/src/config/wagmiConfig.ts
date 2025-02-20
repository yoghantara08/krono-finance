import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { lisk } from "wagmi/chains";

import { PROJECT_ID } from "@/constant";

const wagmiConfig = getDefaultConfig({
  appName: "Krono Finance",
  projectId: PROJECT_ID,
  chains: [lisk],
  ssr: true,
});

export default wagmiConfig;
