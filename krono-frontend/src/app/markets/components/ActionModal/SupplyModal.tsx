import React from "react";

import Image from "next/image";

import { erc20Abi } from "viem";
import {
  useAccount,
  useBalance,
  useWalletClient,
  useWriteContract,
} from "wagmi";

import Button from "@/components/Button/Button";
import NumberInput from "@/components/Input/NumberInput";
import Modal from "@/components/Modal/Modal";
import { LENDING_POOL_ADDRESS } from "@/constant";
import useNumberInput from "@/hooks/useNumberInput";
import {
  publicClient,
  supply,
  supplyCollateral,
} from "@/lib/services/lendingPoolService";
import { quickAddPercentage } from "@/types";

import useLendBorrow from "../../hooks/useLendBorrow";

const SupplyModal = () => {
  const { data: walletClient } = useWalletClient();
  const { address: account } = useAccount();

  const { lendAssetItem, supplyModal, closeSupplyModal } = useLendBorrow();

  const tokenSymbol = lendAssetItem.token.symbol;
  const tokenAddress = lendAssetItem.token.address;

  const { data } = useBalance({
    address: account,
    token: tokenAddress,
  });

  const balance = data?.value && Number(data.value) / 10 ** 18;

  const { displayValue, value, handleInputBlur, handleInputChange } =
    useNumberInput();

  const { writeContractAsync } = useWriteContract();

  const handleApprove = async () => {
    try {
      const amountInSmallestUnit = BigInt(Number(value) * 10 ** 18);

      // Call approve with two arguments: spender (lending pool address) and amount
      const tx = await writeContractAsync({
        abi: erc20Abi,
        address: tokenAddress,
        functionName: "approve",
        args: [LENDING_POOL_ADDRESS, amountInSmallestUnit],
      });

      console.log(tx);
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleSupply = async () => {
    if (!walletClient || !account) return;
    // Supply token to the protocol
    const amount = BigInt(value * 10 ** 18);

    try {
      const hash = await supply(tokenAddress, amount, walletClient, account);
      console.log(hash);

      // Wait for the transaction receipt (using the public client if available)
      const receipt = await publicClient.waitForTransactionReceipt({
        hash,
      });
      console.log("Transaction receipt:", receipt);

      if (receipt.status === "reverted") {
        console.error("Transaction reverted.");
        // Optionally decode the revert reason if your provider supports it.
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSupplyCollateral = async () => {
    if (!walletClient || !account) return;
    // Supply token as collateral
    const amount = BigInt(value * 10 ** 18);

    try {
      const hash = await supplyCollateral(
        tokenAddress,
        amount,
        walletClient,
        account,
      );
      console.log(hash);

      // Wait for the transaction receipt (using the public client if available)
      const receipt = await publicClient.waitForTransactionReceipt({
        hash,
      });
      console.log("Transaction receipt:", receipt);

      if (receipt.status === "reverted") {
        console.error("Transaction reverted.");
        // Optionally decode the revert reason if your provider supports it.
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      title={`Supply ${lendAssetItem.token.symbol}`}
      isOpen={supplyModal}
      onClose={() => {
        closeSupplyModal();
        handleInputChange("");
      }}
      className="max-w-[600px]"
    >
      <div className="py-4">
        <div className="space-y-2.5">
          <NumberInput
            label="Enter amount"
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            value={displayValue}
            suffix={
              <div className="flex items-center gap-1">
                <Image
                  src={lendAssetItem.token.image}
                  alt={lendAssetItem.token.symbol}
                  width={24}
                  height={24}
                />
                <span className="font-medium text-white">
                  {lendAssetItem.token.symbol}
                </span>
              </div>
            }
            placeholder="0"
          />

          {/* BALANCE */}
          <div className="flex items-center justify-between gap-3 text-sm">
            <p>
              Balance: {balance?.toLocaleString()} {lendAssetItem.token.symbol}
            </p>
            <div className="flex items-center gap-1.5">
              {quickAddPercentage.map((percentage) => (
                <button
                  key={percentage}
                  className="rounded-md border bg-elevated px-2.5 py-0.5 hover:bg-primary-hover"
                >
                  {percentage}%
                </button>
              ))}
            </div>
          </div>
        </div>

        <Button
          className="mb-1 mt-4 w-full lg:!text-lg"
          onClick={handleApprove}
          disabled={!value}
        >
          Approve
        </Button>
        <Button
          className="mb-1 mt-4 w-full lg:!text-lg"
          onClick={
            tokenSymbol === "USDC" || tokenSymbol === "USDT"
              ? handleSupply
              : handleSupplyCollateral
          }
          disabled={!value}
        >
          Supply {lendAssetItem.token.symbol}
        </Button>
      </div>
    </Modal>
  );
};

export default SupplyModal;
