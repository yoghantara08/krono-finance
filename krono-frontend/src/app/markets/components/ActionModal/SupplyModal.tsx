import React from "react";

import Image from "next/image";

import Button from "@/components/Button/Button";
import NumberInput from "@/components/Input/NumberInput";
import Modal from "@/components/Modal/Modal";
import useNumberInput from "@/hooks/useNumberInput";
import { quickAddPercentage } from "@/types";

import useLendBorrow from "../../hooks/useLendBorrow";

const SupplyModal = () => {
  const { lendAssetItem, supplyModal, closeSupplyModal } = useLendBorrow();

  const { value, displayValue, handleInputBlur, handleInputChange } =
    useNumberInput();

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
            <p>Balance: 100 {lendAssetItem.token.symbol}</p>
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

        <Button className="mb-1 mt-4 w-full lg:!text-lg">
          Supply {lendAssetItem.token.symbol}
        </Button>
      </div>
    </Modal>
  );
};

export default SupplyModal;
