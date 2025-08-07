import { EyeClosed, EyeIcon } from "lucide-react";
import React from "react";
import { forwardRef } from "react";
import type { FieldError } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError;
  icon?: React.ReactNode;
  isPassword?: boolean;
  isRequired?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, icon, isPassword, isRequired, className = "", ...props },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const inputType = isPassword
      ? showPassword
        ? "text"
        : "password"
      : props.type;
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {isRequired && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <div className="text-gray-400">{icon}</div>
            </div>
          )}
          <input
            ref={ref}
            type={inputType}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            ${icon ? "pl-10" : ""}
            ${
              error
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : ""
            }
            ${className}`}
            {...props}
          />
          {/* <input
            ref={ref}
            type={inputType}
            className={`
              w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
              ${icon ? "pl-10" : ""}
              ${isPassword ? "pr-10" : ""}
              ${
                error
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : ""
              }
              ${className}
            `}
            {...props}
          /> */}
          {isPassword && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeClosed className="h-4 w-4 text-gray-400" />
              ) : (
                <EyeIcon className="h-4 w-4 text-gray-400" />
              )}
            </button>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
      </div>
    );
  }
);
