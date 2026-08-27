import { ICategory, IProduct } from "../types";

export async function fetchCategories() {
  try {
    const res = await fetch("http://localhost:3001/categories");
    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = await res.json();
    return data as ICategory[];
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

export async function fetchProducts() {
  try {
    const res = await fetch("http://localhost:3001/products");
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await res.json();
    return data as IProduct[];
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}
