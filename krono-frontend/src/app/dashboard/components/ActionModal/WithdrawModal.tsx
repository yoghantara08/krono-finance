import React from "react";

import Image from "next/image";

import { useAccount } from "wagmi";

import Button from "@/components/Button/Button";
import NumberInput from "@/components/Input/NumberInput";
import Modal from "@/components/Modal/Modal";
import useNumberInput from "@/hooks/useNumberInput";
import { quickAddPercentage } from "@/types";

import useDashboard from "../../hooks/useDashboard";
import useSupply from "../../hooks/useSupply";

const WithdrawModal = () => {
  const { address } = useAccount();

  const { wihtdrawAssetItem, withdrawModal, closeWithdrawModal } =
    useDashboard();

  const { displayValue, value, handleInputBlur, handleInputChange } =
    useNumberInput();

  const { withdraw } = useSupply();

  const handleWithdraw = async () => {
    if (!address) return;

    try {
      const hash = await withdraw(
        wihtdrawAssetItem.token.address,
        BigInt(value * 10 ** 18),
        address,
      );
      console.log("Withdraw hash:", hash);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      title={`Withdraw ${wihtdrawAssetItem.token.symbol}`}
      isOpen={withdrawModal}
      onClose={() => {
        closeWithdrawModal();
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
                  src={wihtdrawAssetItem.token.image}
                  alt={wihtdrawAssetItem.token.symbol}
                  width={24}
                  height={24}
                />
                <span className="font-medium text-white">
                  {wihtdrawAssetItem.token.symbol}
                </span>
              </div>
            }
            placeholder="0"
          />

          {/* BALANCE */}
          <div className="flex items-center justify-between gap-3 text-sm">
            <p>Available: 100 {wihtdrawAssetItem.token.symbol}</p>
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
          onClick={handleWithdraw}
          disabled={value === 0}
        >
          Withdraw {wihtdrawAssetItem.token.symbol}
        </Button>
      </div>
    </Modal>
  );
};

export default WithdrawModal;
