import React, { ReactNode } from "react";

import { RotateCcwIcon } from "lucide-react";

export interface NumberInputProps {
  label: string;
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
  onBlur?: () => void;
  suffix?: ReactNode;
  className?: string;
  placeholder?: string;
}

const NumberInput = ({
  label,
  onChange,
  value,
  onBlur,
  placeholder,
  suffix,
}: NumberInputProps) => {
  return (
    <div className="space-y-2 text-secondary">
      <div className="flex items-center justify-between">
        <p>{label}</p>
        <RotateCcwIcon className="size-4 cursor-pointer hover:text-white" />
      </div>
      <div className="flex w-full items-center justify-between gap-3 rounded-md border border-input-border bg-input px-4 py-3">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          className="h-full w-full bg-transparent leading-none text-white focus:outline-none"
        />
        <div className="pr-2.5">{suffix}</div>
      </div>
    </div>
  );
};

export default NumberInput;
