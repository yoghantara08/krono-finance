import React from "react";

import classNames from "classnames";

interface ButtonProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  // eslint-disable-next-line no-unused-vars
  onClick?: (() => void) | ((e: any) => void);
  variant?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
}

const Button = ({
  id,
  children,
  className,
  onClick,
  disabled = false,
  variant = "primary",
  type = "button",
}: ButtonProps) => {
  return (
    <button
      id={id}
      type={type}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      className={classNames(
        "inline-flex items-center justify-center rounded-md px-4 py-2",
        "text-sm font-medium transition-colors",
        "focus:outline-none",
        {
          // Primary variant
          "bg-blue-600 text-white hover:bg-blue-700":
            variant === "primary" && !disabled,
          "cursor-not-allowed bg-blue-400 text-gray-100":
            variant === "primary" && disabled,

          // Secondary variant
          "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50":
            variant === "secondary" && !disabled,
          "cursor-not-allowed border border-gray-200 bg-gray-100 text-gray-400":
            variant === "secondary" && disabled,
        },
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
