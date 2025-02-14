import React from "react";

import Image from "next/image";

import Button from "@/components/Button/Button";
import NumberInput from "@/components/Input/NumberInput";
import Modal from "@/components/Modal/Modal";
import useNumberInput from "@/hooks/useNumberInput";
import { quickAddPercentage } from "@/types";

import useDashboard from "../../hooks/useDashboard";

const RepayModal = () => {
  const { repayAssetItem, repayModal, closeRepayModal } = useDashboard();

  const { displayValue, handleInputBlur, handleInputChange } = useNumberInput();

  return (
    <Modal
      title={`Repay ${repayAssetItem.token.symbol}`}
      isOpen={repayModal}
      onClose={() => {
        closeRepayModal();
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
                  src={repayAssetItem.token.image}
                  alt={repayAssetItem.token.symbol}
                  width={24}
                  height={24}
                />
                <span className="font-medium text-white">
                  {repayAssetItem.token.symbol}
                </span>
              </div>
            }
            placeholder="0"
          />

          {/* BALANCE */}
          <div className="flex items-center justify-between gap-3 text-sm">
            <p>Debt: 100 {repayAssetItem.token.symbol}</p>
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
          Repay {repayAssetItem.token.symbol}
        </Button>
      </div>
    </Modal>
  );
};

export default RepayModal;
