"use client";

import { useEffect, useState } from "react";
import { Category, Filters as FiltersType } from "@/lib/types";
import { Select, InputRange } from "./inputs";

interface FiltersProps {
  themes: Category[];
  ageCategories: Category[];
  filters: FiltersType;
  onFiltersChange: (filters: FiltersType) => void;
  onFiltersReset: () => void;
}

export default function Filters({ themes, ageCategories, filters, onFiltersChange, onFiltersReset }: FiltersProps) {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleInputChange = (name: string, value: number | string | null | boolean) => {
    setLocalFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRangeChange = (name: string, min: number | null, max: number | null) => {
    setLocalFilters((prev) => ({
      ...prev,
      [`${name}Min`]: min,
      [`${name}Max`]: max,
    }));
  };

  const handleApplyFilters = () => {
    onFiltersChange({
      ...localFilters,
      page: 1, // Reset page when applying filters
    });
  };

  return (
    <div className="flex flex-col gap-3 justify-content-center">
      <h2 className="font-bold text-2xl text-black">Filtry</h2>
      <Select
        name="sort"
        label="Sortuj"
        options={[
          { id: "pricePerElementDesc", name: "Cena za element malejąco" },
          { id: "priceAsc", name: "Cena rosnąco" },
          { id: "priceDesc", name: "Cena malejąco" },
          { id: "elementsAsc", name: "Elementy rosnąco" },
          { id: "elementsDesc", name: "Elementy malejąco" },
          { id: "minifiguresAsc", name: "Minifigurki rosnąco" },
          { id: "minifiguresDesc", name: "Minifigurki malejąco" },
        ]}
        value={localFilters.sort?.toString()}
        onChange={(value) =>
          onFiltersChange({ ...localFilters, sort: !value || value === "" ? null : value.toString(), page: 1 })
        }
      />

      <Select
        name="age"
        label="Wiek"
        options={ageCategories}
        value={localFilters.ageId}
        onChange={(value) => handleInputChange("ageId", typeof value === "string" ? parseInt(value) : null)}
      />

      <Select
        name="theme"
        label="Kategoria"
        options={themes}
        value={localFilters.themeId}
        onChange={(value) => handleInputChange("themeId", typeof value === "string" ? parseInt(value) : null)}
      />

      <Select
        name="available"
        label="Dostępność"
        options={[
          { id: "true", name: "Dostępne" },
          { id: "false", name: "Wyprzedane" },
        ]}
        value={localFilters.available?.toString()}
        onChange={(value) =>
          handleInputChange("available", !value || value?.toString() === "" ? null : value === "true")
        }
      />

      <InputRange
        name="price"
        label="Cena (zł)"
        min={localFilters.priceMin}
        max={localFilters.priceMax}
        onChange={(min, max) => handleRangeChange("price", min, max)}
      />

      <InputRange
        name="elements"
        label="Elementy (szt)"
        min={localFilters.elementsMin}
        max={localFilters.elementsMax}
        onChange={(min, max) => handleRangeChange("elements", min, max)}
      />

      <InputRange
        name="minifigures"
        label="Minifigurki (szt)"
        min={localFilters.minifiguresMin}
        max={localFilters.minifiguresMax}
        onChange={(min, max) => handleRangeChange("minifigures", min, max)}
      />
      <div className="flex gap-2">
        <button
          onClick={onFiltersReset}
          className="p-2 w-full bg-gray-100 rounded-xl shadow-md hover:shadow-lg hover:bg-gray-200 transition-all text-black font-semibold text-center"
        >
          Reset
        </button>
        <button
          onClick={handleApplyFilters}
          className="p-2 w-full bg-red-600 rounded-xl shadow-md hover:shadow-lg hover:bg-red-700 transition-all text-white font-semibold text-center"
        >
          Filtruj
        </button>
      </div>
    </div>
  );
}
