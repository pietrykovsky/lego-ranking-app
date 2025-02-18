"use client";

import { Category, Filters as FiltersType } from "@/lib/types";
import Filters from "./filters";

interface SideBarProps {
  isOpen: boolean;
  themes: Category[];
  ageCategories: Category[];
  filters: FiltersType;
  onFiltersChange: (filters: FiltersType) => void;
  onFiltersReset: () => void;
  toggleSidebar: () => void;
}

export default function SideBar({
  isOpen,
  themes,
  ageCategories,
  filters,
  toggleSidebar,
  onFiltersChange,
  onFiltersReset,
}: SideBarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 transition-opacity z-20"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full p-4 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-30 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Filters
          ageCategories={ageCategories}
          themes={themes}
          filters={filters}
          onFiltersChange={(filters) => {
            onFiltersChange(filters);
            toggleSidebar();
          }}
          onFiltersReset={() => {
            onFiltersReset();
            toggleSidebar();
          }}
        />
      </div>
    </>
  );
}
