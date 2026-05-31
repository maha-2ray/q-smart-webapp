import React from "react";

import { cn } from "../../libs/utils";

type ButtonProps = {
  title?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?:
    | "primary"
    | "outline"
    | "ghost"
    | "success"
    | "dark"
    | "blue"
    | "clear";
  size?: "sm" | "md" | "lg" | "round";
  disabled?: boolean;
  className?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  loading?: boolean;
  showTitle?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
};

export const Button: React.FC<ButtonProps> = React.memo(
  ({
    title,
    onClick,
    type = "button",
    variant = "primary",
    size = "sm",
    disabled = false,
    className,
    iconLeft,
    iconRight,
    loading = false,
    showTitle = true,
  }) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors ";

    const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
      primary: "bg-blue-900 text-white hover:bg-[#0E4A7D] focus:ring-[#0E4A7D]",
      dark: "bg-[#030213] text-white hover:bg-[#1A1C22] focus:ring-[#1A1C22]",
      outline:
        "border border-theme text-primary hover:bg-gray-100 focus:ring-gray-400",
      ghost: "text-gray-70 cursor-pointer",
      success:
        "bg-[#11833a] text-[#FFFFFF] hover:bg-[#15803D] focus:ring-[#15803D]",
      blue: "bg-[#145DFC] text-white",
      clear:
        "bg-transparent text-gray-70 hover:bg-gray-100 focus:ring-gray-400",
    };

    const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
      sm: "px-3 py-1 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
      round: "px-6 py-4 text-base rounded-full",
    };

    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled || loading}
        aria-disabled={disabled || loading ? "true" : "false"}
        aria-busy={loading ? "true" : "false"}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          disabled || loading ? "opacity-70 cursor-not-allowed" : "",
          className,
        )}
      >
        {iconLeft && !loading && (
          <span className="flex items-center" aria-hidden="true">
            {iconLeft}
          </span>
        )}
        {title && (
          <span
            className={`${showTitle ? "flex" : "hidden md:flex lg:flex"} font-normal text-[14px]`}
          >
            {title}
          </span>
        )}

        {loading && (
          <span className="flex items-center" role="status" aria-live="polite">
            <span
              className="h-4 w-4 animate-spin rounded-full border-2 border-current border-b-transparent"
              aria-hidden="true"
            />
            <span className="sr-only">Loading...</span>
          </span>
        )}
        {iconRight && !loading && (
          <span className="flex items-center" aria-hidden="true">
            {iconRight}
          </span>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
