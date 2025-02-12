import React from "react";

import { RotateCcwIcon } from "lucide-react";

import Button from "@/components/Button/Button";
import Modal from "@/components/Modal/Modal";
import { quickAddPercentage } from "@/types";

import useLendBorrow from "../../hooks/useLendBorrow";

const SupplyModal = () => {
  const { lendAssetItem, supplyModal, closeSupplyModal } = useLendBorrow();

  return (
    <Modal
      title={`Supply ${lendAssetItem.token.symbol}`}
      isOpen={supplyModal}
      onClose={closeSupplyModal}
      className="max-w-[600px]"
    >
      <div className="py-4">
        <div className="space-y-2.5">
          {/* INPUT */}
          <div className="space-y-2 text-secondary">
            <div className="flex items-center justify-between">
              <p>Amount</p>
              <RotateCcwIcon className="size-4 cursor-pointer hover:text-white" />
            </div>
            <div className="flex w-full items-center justify-between gap-3 rounded-md border border-input-border bg-input px-4 py-3">
              <input
                type="text"
                // value={0}
                onChange={() => {}}
                onBlur={() => {}}
                placeholder="0"
                className="h-full w-full bg-transparent leading-none text-white focus:outline-none"
              />
              <div className="">USDC</div>
            </div>
          </div>

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

        <Button className="mt-4 w-full lg:!text-lg">
          Supply {lendAssetItem.token.symbol}
        </Button>
      </div>
    </Modal>
  );
};

export default SupplyModal;
