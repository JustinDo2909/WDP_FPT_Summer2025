import React from "react";

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

type ButtonVariant = "default" | "primary" | "secondary" | "danger" | "outline";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: React.ReactNode;
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  isLoading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  default: "bg-primary text-white hover:bg-primary-light",
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "bg-gray-500 text-white hover:bg-gray-600",
  danger: "bg-red-600 text-white hover:bg-red-700",
  outline: "border border-gray-300 text-gray-700 bg-transparent", // 🆕 No hover
};

const Button: React.FC<ButtonProps> = ({
  label,
  variant = "default",
  icon,
  isLoading,
  disabled,
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
        variantClasses[variant],
        className,
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
      ) : (
        icon
      )}
      {label && <span className="w-full">{label}</span>}
    </button>
  );
};

export default Button;
