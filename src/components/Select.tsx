import React, { forwardRef } from "react";
import type { FieldError } from "react-hook-form";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: FieldError;
  options: { value: string; label: string }[];
  placeholder?: string;
  icon?: React.ReactNode;
  isRequired?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      options,
      placeholder,
      icon,
      isRequired,
      className = "",
      ...props
    },
    ref
  ) => {
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
          <select
            ref={ref}
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
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
      </div>
    );
  }
);
