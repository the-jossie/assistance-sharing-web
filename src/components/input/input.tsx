"use client";

import ctl from "@netlify/classnames-template-literals";
import { useState } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { Text } from "@/components";

// import EyeIcon from "@/svgs/eye.svg";
// import EyeOffIcon from "@/svgs/eye-off.svg";
import { ErrorMessage } from "./error-message";
import { Label } from "./label";

type InputProps = {
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

export const Input: React.FC<InputProps> = ({
  className,
  label = "",
  name = "",
  type = "text",
  error,
  children,
  placeholder,
  options = [],
  ...otherProps
}) => {
  const { value, register } = otherProps;

  const IS_SELECT_INPUT_TYPE = type?.toLowerCase().trim() === "select";
  const IS_TEXTAREA_INPUT_TYPE = type?.toLowerCase().trim() === "textarea";
  const InputElement = IS_SELECT_INPUT_TYPE
    ? "select"
    : IS_TEXTAREA_INPUT_TYPE
      ? "textarea"
      : "input";

  const isPassword = type === "password";
  const isCheckbox = type === "checkbox";

  const [showPassword, setShowPassword] = useState(false);

  const inputStyle = ctl(`
        ${inputBaseStyle}
        ${isPassword ? "pr-10" : ""}
        ${
          error
            ? "outline-red-200"
            : `outline-grey ${isCheckbox ? "w-max cursor-pointer" : "focus:outline-primary"} hover:outline-grey-600`
        }
    `);

  return (
    <div className={className}>
      {!isCheckbox && <Label text={label} htmlFor={name} />}
      <div className={inputContainerStyle}>
        <InputElement
          className={inputStyle}
          type={isPassword && showPassword ? "text" : type}
          value={value}
          id={name}
          placeholder={placeholder}
          {...register}
          {...otherProps}
        >
          {children}
        </InputElement>
        {isCheckbox && (
          <Text
            value={label}
            htmlFor={name}
            tag="label"
            className="ml-2 cursor-pointer"
          />
        )}
        {/* {isPassword && (
          <button
            className={postIconStyle}
            onClick={() => setShowPassword(!showPassword)}
            type="button"
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )} */}
      </div>
      {error && <ErrorMessage error={error} />}
    </div>
  );
};

const inputContainerStyle = ctl(`
  relative max-h-14 w-full
`);

const inputBaseStyle = ctl(`
  w-full px-4 py-2 rounded-[10px] outline outline-1 transition-all
`);

const postIconStyle = ctl(`
  absolute top-0 right-4 h-full flex items-center justify-center
`);
