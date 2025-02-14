import {
  Address,
  createPublicClient,
  http,
  PublicClient,
  WalletClient,
} from "viem";
import { mantaSepoliaTestnet } from "viem/chains";

import { TOKEN_FAUCET_ADDRESS } from "@/constant";
import TOKEN_FAUCET_ABI from "@/lib/abi/TokenFaucetABI.json";

export const publicClient: PublicClient = createPublicClient({
  chain: mantaSepoliaTestnet,
  transport: http("https://pacific-rpc.sepolia-testnet.manta.network/http"),
});

export const claimAllTokens = async (
  account: Address,
  walletClient: WalletClient,
) => {
  try {
    const tokenSymbols = ["USDC", "USDT", "WBTC", "MANTA"];

    for (const symbol of tokenSymbols) {
      await walletClient.writeContract({
        account,
        chain: mantaSepoliaTestnet,
        address: TOKEN_FAUCET_ADDRESS,
        abi: TOKEN_FAUCET_ABI,
        functionName: "claimTokens",
        args: [symbol],
      });
    }

    alert("Tokens claimed successfully!");
  } catch (error) {
    console.error("Error claiming tokens:", error);
  }
};
