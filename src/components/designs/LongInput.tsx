import { forwardRef } from "react";
import type { InputHTMLAttributes, ForwardedRef, ReactNode } from "react";

interface ILongInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  errors?: string[];
  children?: ReactNode;
  theme?: "auth" | "others";
  label?: string;
}

const LongInput = forwardRef(
  (
    { name, errors, children, theme = "auth", label, ...rest }: ILongInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => (
    <div className="w-full max-h-20 flex flex-col items-center">
      {label && (
        <label
          htmlFor={name}
          className="w-full text-left mb-1 block text-sm font-medium  "
        >
          {label}
        </label>
      )}
      <div
        className={`w-full flex items-centerrounded-md ${
          theme === "auth" && "gap-x-2 p-2 bg-custom-light-green"
        } `}
      >
        {children && (
          <div className="min-w-5 max-w-8 rounded-sm min-h-5 max-h-8 bg-white p-0.5">
            {children}
          </div>
        )}
        <input
          name={name}
          id={name}
          className={`max-h-18 w-full border-none ${
            theme === "auth" && `bg-custom-light-green`
          } focus:border-custom-light-blue focus:bg-white focus:outline-none`}
          ref={ref}
          {...rest}
        />
      </div>
      {errors?.map((error, index) => (
        <div key={index}>{error}</div>
      ))}
    </div>
  )
);

LongInput.displayName = "LoingInput";

export default LongInput;
