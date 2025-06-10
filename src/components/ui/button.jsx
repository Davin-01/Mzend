import React from "react";

export function Button({
  children,
  onClick,
  type = "button",
  className = "",
  variant = "primary",
}) {
  const baseStyles = "px-6 py-2 rounded font-semibold transition transform hover:scale-105";

  const variants = {
    primary: "bg-yellow-400 text-black hover:bg-yellow-300",
    secondary: "border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black",
    danger: "bg-red-500 text-white hover:bg-red-600",
    success: "bg-green-500 text-white hover:bg-green-600",
    dark: "bg-black text-white hover:bg-gray-800",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
