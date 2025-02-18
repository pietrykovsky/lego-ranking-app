"use client";

import { useState, useEffect } from "react";
import { getLegoSets, getAgeCategories, getThemes } from "@/lib/actions";
import { LegoSet, Category, Filters as FiltersType } from "@/lib/types";
import { filterLegoSet, sortLegoSet } from "@/lib/utils";
import LegoSetsList from "@/components/lego-sets-list";
import TopSection from "@/components/topsection";
import NavBar from "@/components/navbar";
import Filters from "@/components/filters";
import Pagination from "@/components/pagination";

const PAGE_SIZE = 10;
const DEFAULT_FILTERS = {
  priceMin: null,
  priceMax: null,
  elementsMin: null,
  elementsMax: null,
  minifiguresMin: null,
  minifiguresMax: null,
  themeId: null,
  ageId: null,
  available: null,
  search: "",
  sort: null,
  page: 1,
};

export default function LegoRanking() {
  const [data, setData] = useState({
    legoSets: [] as LegoSet[],
    themes: [] as Category[],
    ageCategories: [] as Category[],
    loading: true,
  });

  const [filters, setFilters] = useState<FiltersType>(DEFAULT_FILTERS);

  function resetFilters() {
    setFilters(DEFAULT_FILTERS);
  }

  function sortLegoSets(legoSets: LegoSet[]) {
    if (!filters.sort) {
      return legoSets;
    }

    return legoSets.sort((a, b) => sortLegoSet(a, b, filters.sort!));
  }

  const filterSet = (legoSet: LegoSet) => filterLegoSet(legoSet, filters);

  function getPaginatedLegoSets() {
    const filteredSets = data.legoSets.filter(filterSet);
    const sortedSets = filters.sort ? sortLegoSets(filteredSets) : filteredSets;
    const start = (filters.page! - 1) * PAGE_SIZE;
    return sortedSets.slice(start, start + PAGE_SIZE);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [legoSets, themes, ageCategories] = await Promise.all([getLegoSets(), getThemes(), getAgeCategories()]);

        setData({
          legoSets,
          themes,
          ageCategories,
          loading: false,
        });
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setData((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <NavBar
        ageCategories={data.ageCategories}
        themes={data.themes}
        filters={filters}
        onFiltersChange={setFilters}
        onFiltersReset={resetFilters}
      />
      <TopSection />
      <div className="min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 justify-center">
            <div className="lg:col-span-3">
              <div className="mb-4 place-self-center text-gray-800 font-semibold">
                {!data.loading &&
                  (data.legoSets.filter(filterSet).length === 0
                    ? "Brak zestawów."
                    : `Znaleziono ${data.legoSets.filter(filterSet).length} zestawów.`)}
              </div>
              <LegoSetsList legoSets={getPaginatedLegoSets()} isLoading={data.loading} />
              <Pagination
                totalItems={data.legoSets.filter(filterSet).length}
                pageSize={PAGE_SIZE}
                filters={filters}
                onFiltersChange={setFilters}
              />
            </div>
            <div className="hidden lg:block overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg transition-all p-4 h-fit">
              <Filters
                ageCategories={data.ageCategories}
                themes={data.themes}
                filters={filters}
                onFiltersChange={setFilters}
                onFiltersReset={resetFilters}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
