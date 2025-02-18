import { LuSearch, LuX } from "react-icons/lu";
import { useState } from "react";

interface Category {
  id: number | string;
  name: string;
}

interface InputProps {
  type: string;
  name: string;
  className?: string;
  placeholder?: string;
  value?: string | number | null;
  onChange: (value: string | number | null) => void;
}

interface SelectProps {
  name: string;
  label: string;
  options: Category[];
  value?: number | string | null;
  onChange: (value: number | string | null) => void;
}

interface InputRangeProps {
  name: string;
  label: string;
  min?: number | null;
  max?: number | null;
  onChange: (min: number | null, max: number | null) => void;
}

interface SearchProps {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
}

export function Input({ type, name, className, placeholder, value, onChange }: InputProps) {
  return (
    <input
      type={type}
      id={name}
      name={name}
      className={`${className} block rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800`}
      placeholder={placeholder}
      value={value || ""}
      onChange={(e) => onChange?.(e.target.value || null)}
    />
  );
}

export function Select({ name, label, options, value, onChange }: SelectProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-gray-800 font-semibold text-sm">
        {label}
      </label>
      <div className="mt-2">
        <select
          id={name}
          name={name}
          className="block w-full rounded-md py-1.5 px-2 ring-1 ring-inset ring-gray-400 focus:text-gray-800"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        >
          <option key="-1" value="">
            -
          </option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export function InputRange({ name, label, min, max, onChange }: InputRangeProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-gray-800 font-semibold text-sm">
        {label}
      </label>
      <div className="mt-2 flex place-content-evenly gap-2">
        <Input
          className="w-20"
          type="number"
          name={name}
          placeholder="od"
          value={min}
          onChange={(value) => onChange?.(Number(value) || null, max || null)}
        />
        <span>-</span>
        <Input
          className="w-20"
          type="number"
          name={`max${name}`}
          placeholder="do"
          value={max}
          onChange={(value) => onChange?.(min || null, Number(value) || null)}
        />
      </div>
    </div>
  );
}

export function Search({ value, onChange, className }: SearchProps) {
  const [localSearch, setLocalSearch] = useState(value ?? "");
  return (
    <div className="relative flex-initial shrink">
      <button
        onClick={() => onChange(localSearch ?? "")}
        className="absolute left-1 -translate-y-1/2 top-1/2 p-1 text-gray-700 hover:text-gray-500"
      >
        <LuSearch className="w-5 h-5" />
      </button>
      <input
        type="text"
        placeholder="Szukaj..."
        className={`${className ?? ""} w-full input rounded-full px-8 py-2 shadow-md`}
        onChange={(e) => setLocalSearch(e.target.value)}
        value={localSearch}
        name="search"
      />
      <button
        type="reset"
        onClick={() => setLocalSearch("")}
        className="absolute right-1 -translate-y-1/2 top-1/2 p-1 text-gray-700 hover:text-gray-500"
      >
        <LuX className="w-5 h-5" />
      </button>
    </div>
  );
}
