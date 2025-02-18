import { LegoSet, Filters } from "./types";

export function filterLegoSet(legoSet: LegoSet, filters: Filters): boolean {
  const conditions = [
    !filters.priceMin || legoSet.price >= filters.priceMin,
    !filters.priceMax || legoSet.price <= filters.priceMax,
    !filters.elementsMin || legoSet.elements >= filters.elementsMin,
    !filters.elementsMax || legoSet.elements <= filters.elementsMax,
    !filters.minifiguresMin || (legoSet.minifigures && legoSet.minifigures >= filters.minifiguresMin),
    !filters.minifiguresMax || (legoSet.minifigures && legoSet.minifigures <= filters.minifiguresMax),
    !filters.themeId || legoSet.theme.id === filters.themeId,
    !filters.ageId || legoSet.age.id === filters.ageId,
    filters.available === null || legoSet.available === filters.available,
    filters.search === "" || (filters.search && legoSet.title.toLowerCase().includes(filters.search)),
  ];

  return conditions.every(Boolean);
}

export function sortLegoSet(a: LegoSet, b: LegoSet, sortBy: string): number {
  switch (sortBy) {
    case "priceAsc":
      return a.price - b.price;
    case "priceDesc":
      return b.price - a.price;
    case "elementsAsc":
      return a.elements - b.elements;
    case "elementsDesc":
      return b.elements - a.elements;
    case "minifiguresAsc":
      return (a.minifigures || 0) - (b.minifigures || 0);
    case "minifiguresDesc":
      return (b.minifigures || 0) - (a.minifigures || 0);
    case "pricePerElementDesc":
      return parseFloat(b.price_per_element) - parseFloat(a.price_per_element);
    default:
      return parseFloat(a.price_per_element) - parseFloat(b.price_per_element);
  }
}
