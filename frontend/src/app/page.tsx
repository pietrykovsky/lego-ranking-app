"use client";

import { useState, useEffect } from "react";
import { getLegoSets, getAgeCategories, getThemes } from "@/lib/actions";
import LegoSetsList from "@/components/lego-sets-list";
import TopSection from "@/components/topsection";
import NavBar from "@/components/navbar";
import { LegoSet, Category } from "@/lib/types";

export default function LegoRanking() {
  const [initialLegoSets, setInitialLegoSets] = useState<LegoSet[]>([]);
  const [themes, setThemes] = useState<Category[]>([]);
  const [ageCategories, setAgeCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredLegoSets, setFilteredLegoSets] = useState<LegoSet[]>([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [legoSets, themesData, ageCategoriesData] = await Promise.all([
        getLegoSets(),
        getThemes(),
        getAgeCategories(),
      ]);

      setInitialLegoSets(legoSets);
      setFilteredLegoSets(legoSets);
      setThemes(themesData);
      setAgeCategories(ageCategoriesData);
      setLoading(false);
    }

    fetchData();
  }, []);

  return (
    <>
      <NavBar />
      <TopSection />
      <div className="min-h-screen p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 justify-center">
            <div className="lg:col-span-3">
              <LegoSetsList legoSets={filteredLegoSets} isLoading={loading} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
