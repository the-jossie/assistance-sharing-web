import ctl from "@netlify/classnames-template-literals";
import { Text } from "@/components";

interface LabelProps {
  text: string;
  htmlFor: string;
  required?: boolean;
}

export const Label = ({ text, htmlFor, required = false }: LabelProps) => {
  const noLabel = !text;
  if (noLabel) return null;
  return (
    <Text
      //   variant="p16"
      tag="label"
      test-id="label"
      className={labelStyle}
      htmlFor={htmlFor}
    >
      {text}
      {required && <span className="ml-1 text-red-200">*</span>}
    </Text>
  );
};

const labelStyle = ctl(`
  mb-1 block text-sm
`);
