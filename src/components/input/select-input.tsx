"use client";

import ctl from "@netlify/classnames-template-literals";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { ErrorMessage } from "./error-message";
import { Label } from "./label";

type SelectInputProps = {
  className?: string;
  label?: string;
  error?: FieldError;
  name?: string;
  options?: string[];
  register?: UseFormRegisterReturn;
  type?: React.HTMLInputTypeAttribute | "textarea";
} & React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  React.SelectHTMLAttributes<HTMLSelectElement>;

export const SelectInput: React.FC<SelectInputProps> = ({
  className,
  label = "",
  name = "",
  error,
  placeholder,
  options = [],
  ...otherProps
}) => {
  const { value, register } = otherProps;

  const inputStyle = ctl(`
        ${inputBaseStyle}
        ${
          error
            ? "outline-red-200 bg-red-600"
            : `outline-grey focus:outline-primary hover:outline-grey-600`
        }
    `);

  return (
    <div className={className}>
      {label && <Label text={label} htmlFor={name} />}
      <div className={inputContainerStyle}>
        <select
          className={inputStyle}
          value={value}
          id={name}
          {...register}
          {...otherProps}
        >
          <option value="">{placeholder}</option>
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      {error && <ErrorMessage error={error} />}
    </div>
  );
};

const inputContainerStyle = ctl(`
  relative max-h-14 w-full
`);

const inputBaseStyle = ctl(`
  w-full min-w-[177px] py-[10px] px-[25px] rounded-[10px] border border-grey transition-all
`);
