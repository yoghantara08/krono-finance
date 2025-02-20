// export function formatCurrency(amount: bigint): string {
//   return Number(amount).toLocaleString("en-US", {
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 0,
//   });
// }

import BigNumber from "bignumber.js";

export const formatCurrency = (amount: string) => {
  const bn = BigNumber(amount)
    .div(10 ** 18)
    .toFixed(2)
    .toString();

  return BigNumber(bn).toFormat();
};
