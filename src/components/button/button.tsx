import ctl from "@netlify/classnames-template-literals";
import Link from "next/link";
import { Text } from "@/components";

type ButtonProps = {
  isLoading?: boolean;
  href?: string;
  text: string;
  variant?: keyof typeof buttonVariantStyle;
  size?: keyof typeof buttonSizeStyle;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  shape?: "round" | "square";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  isLoading = false,
  text,
  variant = "primary",
  size = "medium",
  shape = "square",
  className,
  disabled,
  href,
  prefixIcon,
  suffixIcon,
  ...otherProps
}: ButtonProps) => {
  const buttonStyle = ctl(`
    ${buttonBaseStyle}
    ${buttonVariantStyle[variant]}
    ${buttonSizeStyle[size]}
    ${shape === "square" ? "rounded-md" : "rounded-full "}
    ${className}
  `);

  return href ? (
    <Link href={href} className={buttonStyle}>
      <Text value={text} />
    </Link>
  ) : (
    <button
      className={buttonStyle}
      disabled={disabled || isLoading}
      {...otherProps}
    >
      {prefixIcon}{" "}
      <Text value={isLoading ? "..." : text} className="flex-grow" />
      {suffixIcon}
    </button>
  );
};

const buttonBaseStyle = ctl(
  `px-6 py-2 font-semibold transition-all flex items-center justify-center space-x-1 disabled:cursor-not-allowed`,
);
const buttonVariantStyle = {
  primary: `bg-primary hover:bg-black text-white disabled:bg-black disabled:opacity-50`,
  secondary: `border border-primary text-primary`,
  tertiary: `bg-black text-white border border-black hover:bg-white hover:text-black`,
};
const buttonSizeStyle = {
  xsmall: `!p-2 rounded-md w-max !text-sm !font-normal`,
  small: `w-max py-2 px-4 text-sm`,
  medium: `w-max text-sm font-thin`,
  large: `w-full md:w-72 md:px-10 md:!py-5`,
};

export { Button };
