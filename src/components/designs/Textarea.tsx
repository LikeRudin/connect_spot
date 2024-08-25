import type { TextareaHTMLAttributes } from "react";

interface ITextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  name: string;
  required: boolean;
  placeholder?: string;
  value?: string;
}

const TextArea = ({
  label,
  name,
  placeholder,
  required = true,
  value,
  ...rest
}: ITextAreaProps) => {
  return (
    <div className="w-full flex flex-col">
      <label htmlFor={name} className="mb-1 block text-sm font-medium ">
        {label}
      </label>

      <div className="w-full">
        <textarea
          id={name}
          name={name}
          rows={4}
          className="block w-full mt-1 shadow-sm rounded-sm border-gray-400 focus:border-transparent focus:ring-blue-100 focus:ring-2 focus:ring-offset-1"
          required={required}
          placeholder={placeholder}
          defaultValue={value}
          {...rest}
        />
      </div>
    </div>
  );
};

export default TextArea;
