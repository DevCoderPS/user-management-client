import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, X } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface AutocompleteSelectProps {
  label?: string;
  error?: string;
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  multiple?: boolean;
}

export const AutocompleteSelect: React.FC<AutocompleteSelectProps> = ({
  label,
  error,
  options,
  value,
  onChange,
  placeholder = "Search and select...",
  multiple = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter(
    (option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !value.includes(option.value)
  );

  const selectedOptions = options.filter((option) =>
    value.includes(option.value)
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    if (multiple) {
      onChange([...value, optionValue]);
    } else {
      onChange([optionValue]);
      setIsOpen(false);
    }
    setSearchTerm("");
  };

  const handleRemove = (optionValue: string) => {
    onChange(value.filter((v) => v !== optionValue));
  };

  return (
    <div className="w-full" ref={containerRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <div
        className={`relative border rounded-md ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        <div className="flex flex-wrap gap-1 p-2">
          {selectedOptions.map((option) => (
            <span
              key={option.value}
              className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-md"
            >
              {option.label}
              <button
                type="button"
                onClick={() => handleRemove(option.value)}
                className="ml-1 hover:text-blue-600"
              >
                <X size={12} />
              </button>
            </span>
          ))}

          <div className="flex-1 min-w-0">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsOpen(true)}
              placeholder={selectedOptions.length === 0 ? placeholder : ""}
              className="w-full border-0 outline-none bg-transparent p-1 text-sm"
            />
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600"
          >
            <ChevronDown
              size={16}
              className={`transform transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className="w-full px-3 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                >
                  {option.label}
                </button>
              ))
            ) : (
              <div className="px-3 py-2 text-gray-500 text-sm">
                {searchTerm ? "No options found" : "All options selected"}
              </div>
            )}
          </div>
        )}
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
