import React from "react";

import Image from "next/image";

import { useAccount, useWalletClient } from "wagmi";

import Button from "@/components/Button/Button";
import NumberInput from "@/components/Input/NumberInput";
import Modal from "@/components/Modal/Modal";
import useNumberInput from "@/hooks/useNumberInput";
import { borrow, publicClient } from "@/lib/services/lendingPoolService";
import { quickAddPercentage } from "@/types";

import useLendBorrow from "../../hooks/useLendBorrow";

const BorrowModal = () => {
  const { data: walletClient } = useWalletClient();
  const { address: account } = useAccount();

  const { borrowAssetItem, borrowModal, closeBorrowModal } = useLendBorrow();

  const { displayValue, value, handleInputBlur, handleInputChange } =
    useNumberInput();

  const tokenAddress = borrowAssetItem.token.address;

  const handleBorrow = async () => {
    if (!walletClient || !account) return;

    const amount = BigInt(value * 10 ** 18);

    try {
      const hash = await borrow(tokenAddress, amount, walletClient, account);
      console.log(hash);

      // Wait for the transaction receipt (using the public client if available)
      const receipt = await publicClient.waitForTransactionReceipt({
        hash,
      });
      console.log("Transaction receipt:", receipt);

      if (receipt.status === "reverted") {
        console.error("Transaction reverted.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      title={`Borrow ${borrowAssetItem.token.symbol}`}
      isOpen={borrowModal}
      onClose={() => {
        closeBorrowModal();
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
                  src={borrowAssetItem.token.image}
                  alt={borrowAssetItem.token.symbol}
                  width={24}
                  height={24}
                />
                <span className="font-medium text-white">
                  {borrowAssetItem.token.symbol}
                </span>
              </div>
            }
            placeholder="0"
          />

          {/* BALANCE */}
          <div className="flex items-center justify-between gap-3 text-sm">
            <p>Borrow limit: $100 / $200</p>
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

        <Button className="mb-1 mt-4 w-full lg:!text-lg" onClick={handleBorrow}>
          Borrow {borrowAssetItem.token.symbol}
        </Button>
      </div>
    </Modal>
  );
};

export default BorrowModal;
