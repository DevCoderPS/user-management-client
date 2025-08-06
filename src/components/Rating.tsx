import React from "react";
import { Star } from "lucide-react";
import type { FieldError } from "react-hook-form";

interface RatingProps {
  label?: string;
  error?: FieldError;
  value: number;
  onChange: (rating: number) => void;
  max?: number;
  size?: number;
}

export const Rating: React.FC<RatingProps> = ({
  label,
  error,
  value,
  onChange,
  max = 5,
  size = 24,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <div className="flex items-center gap-1">
        {Array.from({ length: max }, (_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= value;
          const isHalfFilled = starValue - 0.5 === value;

          return (
            <button
              key={index}
              type="button"
              onClick={() => onChange(starValue)}
              onMouseEnter={() => {}}
              className="transition-colors hover:scale-110 transform duration-150"
            >
              <Star
                size={size}
                className={`${
                  isFilled || isHalfFilled
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                } hover:text-yellow-400`}
              />
            </button>
          );
        })}
        <span className="ml-2 text-sm text-gray-600">
          {value.toFixed(1)} / {max}
        </span>
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
};
