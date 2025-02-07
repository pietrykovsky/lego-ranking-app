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
  minifigures?: number;
  link: string;
  img?: string;
}

export interface Filters {
  priceMin?: number;
  priceMax?: number;
  elementsMin?: number;
  elementsMax?: number;
  minifiguresMin?: number;
  minifiguresMax?: number;
  themeId?: number;
  ageId?: number;
  available?: boolean;
  search?: string;
  page?: number;
}
