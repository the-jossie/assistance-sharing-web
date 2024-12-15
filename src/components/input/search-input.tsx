"use client";

import ctl from "@netlify/classnames-template-literals";
import React, { FormEvent, useEffect, useState } from "react";
import { Label } from "./label";

interface SearchInputProps {
  label?: string;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  handleSearch?: null | (() => void);
  placeholder?: string;
  wrapperStyle?: string;
}
export const SearchInput = ({
  label = "",
  text,
  setText,
  placeholder = "Search...",
  handleSearch,
  wrapperStyle,
}: SearchInputProps & React.ComponentPropsWithoutRef<"input">) => {
  const hasCustomSearch = !!handleSearch;

  const DELAY_IN_MS = 1_000;
  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
    if (hasCustomSearch && isTouched) {
      const searchTimeout = setTimeout(() => {
        handleSearch();
      }, DELAY_IN_MS);

      return () => clearTimeout(searchTimeout);
    }
  }, [text, isTouched, hasCustomSearch, handleSearch]);

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);

    setIsTouched(true);
  };

  return (
    <div className={`flex-1 ${wrapperStyle}`}>
      <Label text={label} htmlFor="search-input" />

      <div className={inputBackground}>
        <input
          id="search-input"
          className={inputStyle}
          placeholder={placeholder}
          value={text}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

const inputBackground = ctl(`
  bg-grey-500 flex rounded-full px-4 items-center flex-1 border transition-colors duration-300 focus-within:border-primary
`);

const inputStyle = ctl(`
  bg-transparent py-3 flex-1 outline-none font-[16px] leading-0 text-sm
`);
