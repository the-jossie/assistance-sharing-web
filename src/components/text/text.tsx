import ctl from "@netlify/classnames-template-literals";

interface TextProps {
  value?: string;
  className?: string;
  children?: React.ReactNode;
  variant?: keyof typeof textVariantStyle;
  tag?: React.ElementType;
  weight?: keyof typeof fontWeightStyle;
  htmlFor?: string;
}

const Text = ({
  className,
  children,
  value,
  variant = "p",
  weight,
  tag,
  htmlFor = "",
}: TextProps) => {
  const firstLetterOfVariant = variant[0];
  const shouldRenderParagraphTag = firstLetterOfVariant === "p";
  let textTag = (shouldRenderParagraphTag ? "p" : variant) as React.ElementType;
  const TextElement = tag ? tag : textTag;

  const textStyle = ctl(`
        ${textVariantStyle[variant]}
        ${weight && fontWeightStyle[weight]}
        ${className}
    `);

  const isLabel = !!htmlFor;
  const labelProps = isLabel ? { htmlFor } : {};

  return (
    <TextElement className={textStyle} {...labelProps}>
      {value || children}
    </TextElement>
  );
};

const fontWeightStyle = {
  300: `font-light`,
  400: `font-normal`,
  500: `font-medium`,
  600: `font-semibold`,
  700: `font-bold`,
  800: `font-extrabold`,
  900: `font-black`,
};

const textVariantStyle = {
  h1: `font-extrabold text-4xl md:text-6xl leading-[60px] md:leading-[80px]`,
  h2: `font-bold text-xl md:text-3xl`,
  h3: `font-bold text-lg md:text-2xl`,
  h4: `font-bold md:text-lg leading-6`,
  h5: ``,
  p: `text-sm md:text-base`,
  p2: `text-xs md:text-sm`,
  p3: `text-xs`,
};

export { Text };
