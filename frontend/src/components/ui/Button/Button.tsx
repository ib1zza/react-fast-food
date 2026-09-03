import React from "react";
import "./Button.css";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant: "outline" | "solid";
  square?: boolean;
  size?: "s" | "m" | "l";
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  square,
  size = "m",
  className = "",
  type = "button",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`button button_${variant} ${square ? "button_square" : ""} button_size_${size} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };

