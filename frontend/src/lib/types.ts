export interface Category {
  id: number;
  name: string;
}

export interface LegoSet {
  title: string;
  product_id: string;
  price: number;
  elements: number;
  price_per_element: string;
  theme: Category;
  age: Category;
  available: boolean;
  minifigures: number | null;
  link: string;
  img?: string;
}

export interface Filters {
  priceMin: number | null;
  priceMax: number | null;
  elementsMin: number | null;
  elementsMax: number | null;
  minifiguresMin: number | null;
  minifiguresMax: number | null;
  themeId: number | null;
  ageId: number | null;
  available: boolean | null;
  search: string;
  sort: string | null;
  page: number;
}
