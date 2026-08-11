import { create } from 'zustand';
import type { ICategory, IProduct } from '../types';


interface CatalogState {
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
}

export const useCatalogStore = create<CatalogState>((set) => ({
  categories: [],
  products: [],
  selectedCategoryId: null,
  isLoadingCategories: false,
  isLoadingProducts: false,
  error: null,

  setCategories: (categories) => set({ categories }),
  setProducts: (products) => set({ products }),
  setSelectedCategoryId: (id) => set({ selectedCategoryId: id }),
  setLoadingCategories: (v) => set({ isLoadingCategories: v }),
  setLoadingProducts: (v) => set({ isLoadingProducts: v }),
  setError: (error) => set({ error }),
}));
