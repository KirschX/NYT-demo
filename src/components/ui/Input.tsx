import * as React from "react";

import { cn } from "@/utils";

import FILTER_LABELS from "@/constants/labels";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: boolean;
  options?: { value: string; label: string; checked: boolean }[];
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, id, type, options, placeholder, ...props }, ref) => {
    if (type === "checkbox" && options) {
      return (
        <div>
          {label && (
            <label className=" font-semibold text-black" htmlFor={id}>
              {FILTER_LABELS[id].label}
            </label>
          )}
          <div className={cn("flex flex-wrap mt-[8px] ", className)}>
            {options.map((option) => (
              <label key={option.value} className="items-center ">
                <input
                  type="checkbox"
                  className=" peer hidden"
                  name={id}
                  value={option.value}
                  ref={ref}
                  checked={option.checked}
                  {...props}
                />
                <div className=" mr-[8px] border-White60 border peer-checked:bg-Sub_Blues peer-checked:text-white rounded-[30px] pt-[6px] px-[12px] pb-[4px] mb-[8px]">
                  {option.label}
                </div>
              </label>
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div id="date-input-container">
          {label && (
            <label className=" font-semibold text-black " htmlFor={id}>
              {FILTER_LABELS[id].label}
            </label>
          )}
          <input
            className={cn(
              "flex h-10 w-full rounded-[8px] border px-[20px] py-[10px] mt-[8px] text-gray placeholder:text-gray",
              className
            )}
            ref={ref}
            {...(type === "date"
              ? { "data-placeholder": FILTER_LABELS[id].placeholder }
              : {})}
            placeholder={FILTER_LABELS[id]?.placeholder}
            name={id}
            type={type}
            {...props}
          />
        </div>
      );
    }
  }
);
Input.displayName = "Input";

export { Input };
