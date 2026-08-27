import "./Button.css";

interface ButtonProps {
  children: React.ReactNode;
  variant: "outline" | "solid";
  square?: boolean;
  size?: "s" | "m" | "l";
}

const Button: React.FC<ButtonProps> = (props) => {
  const { children, variant, square, size = "m" } = props;

  return (
    <button
      className={`button button_${variant} ${square ? "button_square" : ""} button_size_${size}`}
    >
      {children}
    </button>
  );
};

export { Button };
