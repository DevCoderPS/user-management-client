import React from "react";
import type { FieldError } from "react-hook-form";

interface SliderProps {
  label?: string;
  error?: FieldError;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  showValue?: boolean;
}

export const Slider: React.FC<SliderProps> = ({
  label,
  error,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  showValue = true,
}) => {
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-1">
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
          {showValue && <span className="text-sm text-gray-500">{value}</span>}
        </div>
      )}

      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider
            ${error ? "slider-error" : ""}`}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .slider::-webkit-slider-thumb:hover {
          background: #2563eb;
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .slider-error::-webkit-slider-thumb {
          background: #ef4444;
        }

        .slider-error::-moz-range-thumb {
          background: #ef4444;
        }
      `}</style>
    </div>
  );
};
