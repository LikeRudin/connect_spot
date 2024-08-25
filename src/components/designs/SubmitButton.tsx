"use client";

import { useFormStatus } from "react-dom";
import type { ButtonHTMLAttributes } from "react";

interface ISubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  className?: string;
}

const SubmitButton = ({ text, className }: ISubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <input
      value={pending ? "loading" : text}
      type="submit"
      className={
        className ||
        "w-full mt-0.5 bg-custom-dark-blue hover:bg-custom-light-blue text-white hover:text-custom-gray py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-bold focus:ring-2 focus:ring-offset-2 focus-ring-blue-100  focus:outline-none"
      }
    />
  );
};

export default SubmitButton;
