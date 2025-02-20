// "use client";
// import React from "react";

// import { useAccount, useWalletClient } from "wagmi";

// import { TEST_WBTC } from "@/constant";
// import { setTokenPrice } from "@/lib/services/lendingPoolService";

// const SetToken = () => {
//   const { address } = useAccount();
//   const { data } = useWalletClient();

//   const changeTokenPrice = async () => {
//     if (!data || !address) return;

//     try {
//       const hash = await setTokenPrice(
//         TEST_WBTC,
//         95000n * 10n ** 18n,
//         data,
//         address,
//       );
//       console.log(hash);
//     } catch (error) {
//       console.error("Failed to set token:", error);
//     }
//   };

//   return <div onClick={changeTokenPrice}>SetToken</div>;
// };

// export default SetToken;
