import { Check } from "lucide-react";
import React, { forwardRef } from "react";
import type { FieldError } from "react-hook-form";

interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: FieldError;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      // <div className="w-full">
      //   <div className="flex items-center">
      //     <div className="relative">
      //       <input
      //         ref={ref}
      //         type="checkbox"
      //         className="sr-only peer"
      //         {...props}
      //       />
      //       <div
      //         className={`w-5 h-5 border-2 rounded flex items-center justify-center
      //       peer-checked:bg-blue-600 peer-checked:border-blue-600 border-gray-300
      //       peer-focus:ring-2 peer-focus:ring-blue-500 peer-focus:ring-offset-2
      //       ${error ? "border-red-500" : ""}
      //       ${className}
      //       `}
      //       >
      //         <CheckIcon className="w-5 h-5 text-white opacity-0 peer-checked:opacity-100" />
      //       </div>
      //     </div>
      //     {label && (
      //       <label className="ml-2 text-sm font-medium text-gray-700 cursor-pointer">
      //         {label}
      //       </label>
      //     )}
      //   </div>
      //   {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
      // </div>
      <div className="space-y-1">
        <div className="flex items-center">
          <div className="relative">
            <input
              ref={ref}
              type="checkbox"
              className={`
                w-5 h-5 border-2 rounded flex items-center justify-center
              peer-checked:bg-blue-600 peer-checked:border-blue-600 border-gray-300
                peer-focus:ring-2 peer-focus:ring-blue-500 peer-focus:ring-offset-2
                disabled:bg-gray-50 disabled:cursor-not-allowed
                ${
                  error
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : ""
                }
                ${className}
              `}
              {...props}
            />
            {props.checked && (
              <Check className="absolute inset-0 w-5 h-5 text-white pointer-events-none" />
            )}
          </div>
          {label && (
            <label className="ml-2 text-sm text-gray-700 cursor-pointer">
              {label}
            </label>
          )}
        </div>
        {error && <p className="text-sm text-red-600">{error.message}</p>}
      </div>
    );
  }
);
