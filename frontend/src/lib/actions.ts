"use server";

import { LegoSet, Category } from "./types";

const API_URL = process.env.API_URL || "http://127.0.0.1:8000/api";

export async function getLegoSets(): Promise<LegoSet[]> {
  let legoSets: LegoSet[] = [];
  let page = 1;
  let url = `${API_URL}/legosets?page=${page}`;

  do {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch LEGO sets");
    const data = await response.json();
    legoSets = [...legoSets, ...data.results];
    url = data.next;
    page++;
  } while (url != null);

  return legoSets;
}

export async function getThemes() {
  const response = await fetch(`${API_URL}/legosets/themes/`);
  if (!response.ok) throw new Error("Failed to fetch themes");
  const data = await response.json();
  const themes: Category[] = data;
  return themes;
}

export async function getAgeCategories() {
  const response = await fetch(`${API_URL}/legosets/age-categories/`);
  if (!response.ok) throw new Error("Failed to fetch age categories");
  const data = await response.json();
  const ageCategories: Category[] = data;
  return ageCategories;
}
