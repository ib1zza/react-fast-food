import { ICategory, IProduct } from "../types";

export type CatalogState = {
  categories: ICategory[];
  products: IProduct[];
  selectedCategoryId: string | null;
  isLoadingCategories: boolean;
  isLoadingProducts: boolean;
  error: string | null;

  setCategories: (categories: ICategory[]) => void;
  setProducts: (products: IProduct[]) => void;
  setSelectedCategoryId: (id: string | null) => void;
  setLoadingCategories: (v: boolean) => void;
  setLoadingProducts: (v: boolean) => void;
  setError: (error: string | null) => void;
};
