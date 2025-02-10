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
        "inline-flex items-center justify-center rounded-md px-4 py-3",
        "text-sm font-medium transition-colors md:text-base",
        "focus:outline-none",
        {
          // Primary variant
          "bg-primary hover:bg-primary-hover":
            variant === "primary" && !disabled,
          "bg-primary/80 text-secondary cursor-not-allowed":
            variant === "primary" && disabled,

          // Secondary variant
          "border-primary/60 bg-primary/20 hover:bg-primary border":
            variant === "secondary" && !disabled,
          "border-primary/20 bg-primary/20 text-secondary cursor-not-allowed border":
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
