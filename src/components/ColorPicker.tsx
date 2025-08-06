import React, { useState } from "react";
import type { FieldError } from "react-hook-form";

interface ColorPickerProps {
  label?: string;
  error?: FieldError;
  value: string;
  onChange: (color: string) => void;
}

const predefinedColors = [
  "#3B82F6",
  "#EF4444",
  "#10B981",
  "#F59E0B",
  "#8B5CF6",
  "#EC4899",
  "#14B8A6",
  "#F97316",
  "#6366F1",
  "#84CC16",
  "#06B6D4",
  "#F43F5E",
];

export const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  error,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center gap-2
            ${
              error
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300"
            }`}
        >
          <div
            className="w-6 h-6 rounded border border-gray-300"
            style={{ backgroundColor: value }}
          />
          <span className="text-sm text-gray-700">{value}</span>
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-1 p-3 bg-white border border-gray-300 rounded-md shadow-lg">
            <div className="grid grid-cols-4 gap-2 mb-3">
              {predefinedColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => {
                    onChange(color);
                    setIsOpen(false);
                  }}
                  className={`w-8 h-8 rounded border-2 hover:scale-110 transition-transform
                    ${value === color ? "border-gray-800" : "border-gray-300"}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="color"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-8 h-8 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
                placeholder="#000000"
              />
            </div>
          </div>
        )}
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error?.message}</p>}
    </div>
  );
};
