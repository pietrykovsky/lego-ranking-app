"use client";

import { Fira_Code } from "next/font/google";
import { BsSliders, BsXLg } from "react-icons/bs";
import Link from "next/link";
import { useState } from "react";
import SideBar from "./sidebar";
import { Category, Filters as FiltersType } from "@/lib/types";
import { Search } from "./inputs";

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

interface NavBarProps {
  themes: Category[];
  ageCategories: Category[];
  filters: FiltersType;
  onFiltersChange: (filters: FiltersType) => void;
  onFiltersReset: () => void;
}

export default function NavBar({ themes, ageCategories, filters, onFiltersChange, onFiltersReset }: NavBarProps) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  return (
    <nav className="w-full bg-[#c70000] z-10 shadow-md sticky top-0">
      <div className="flex justify-between lg:justify-around items-center px p-4 text-center gap-2">
        <h1 className={`${firaCode.className} font-semibold text-xl text-white hover:text-gray-300`}>
          <Link href="https://pietrykovsky.com">pietrykovsky</Link>
        </h1>
        <Search value={filters.search} onChange={(value) => onFiltersChange({ ...filters, search: value })} />
        <button
          onClick={toggleSidebar}
          className="hover:text-gray-300 text-3xl transition-all text-white text-center lg:hidden z-40"
        >
          {!isSideBarOpen ? <BsSliders /> : <BsXLg className="text-black hover:text-gray-600" />}
        </button>
      </div>
      <SideBar
        isOpen={isSideBarOpen}
        toggleSidebar={toggleSidebar}
        ageCategories={ageCategories}
        themes={themes}
        filters={filters}
        onFiltersChange={onFiltersChange}
        onFiltersReset={onFiltersReset}
      />
    </nav>
  );
}
