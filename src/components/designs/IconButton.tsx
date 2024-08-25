import type { ButtonHTMLAttributes, ReactNode } from "react";

interface IIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  icon: ReactNode;
  active?: boolean;

  theme: "nav" | "others";
}

const IconButton = ({
  icon,
  text,
  active,

  theme,
  ...rest
}: IIconButtonProps) => (
  <button
    className={`cursor-pointer w-full rounded-sm px-2 py-1 transition-colors duration-200 ease-in-out 
                flex items-center justify-between space-x-2  
                ${
                  theme === "nav"
                    ? active
                      ? "bg-custom-dark-blue hover:bg-custom-light-blue text-white hover:text-custom-gray"
                      : "bg-custom-light-blue hover:bg-custom-dark-blue text-custom-gray hover:text-white"
                    : active
                    ? " bg-custom-light-blue hover-bg-white text-white hover:text-custom-gray  "
                    : " bg-white hover:bg-custom-light-blue text-custom-gray hover:text-custom-dark-blue  "
                }
               `}
    {...rest}
  >
    {text && <span className="text-left">{text}</span>}
    <div className="min-w-4 min-h-4">{icon}</div>
  </button>
);

export default IconButton;
