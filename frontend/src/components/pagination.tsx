"use client";

import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { Filters as FiltersType } from "@/lib/types";

interface PaginationProps {
  totalItems: number;
  pageSize: number;
  filters: FiltersType;
  onFiltersChange: (filters: FiltersType) => void;
}

export default function Pagination({ totalItems, pageSize, filters, onFiltersChange }: PaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const showMax = 3;
    const currentPage = filters.page || 1;

    if (totalPages <= showMax) {
      // If total pages is less than max show, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Calculate start and end of current page range
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      // Adjust range if at the edges
      if (currentPage <= 2) {
        end = 4;
      }
      if (currentPage >= totalPages - 1) {
        start = totalPages - 3;
      }

      // Add ellipsis if needed
      if (start > 2) {
        pages.push("...");
      }

      // Add page numbers
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Add ellipsis if needed
      if (end < totalPages - 1) {
        pages.push("...");
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onFiltersChange({
        ...filters,
        page: page,
      });
    }
  };

  const currentPage = filters.page || 1;

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center my-6">
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage <= 1}
        className="rounded-lg text-gray-800 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        <LuChevronLeft className="w-5 h-5" />
      </button>

      <div className="flex">
        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => (typeof page === "number" ? handlePageClick(page) : null)}
            disabled={page === "..."}
            className={`
              min-w-10 h-10 px-3 rounded-lg font-semibold text-gray-800
              ${
                typeof page === "number" && page === currentPage
                  ? "bg-red-600 text-white font-bold"
                  : page === "..."
                  ? "cursor-default"
                  : "hover:text-gray-600"
              }
            `}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="rounded-lg text-gray-800 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        <LuChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
