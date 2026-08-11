import { create } from 'zustand';
import { CatalogState } from './useCatalogStore.types';

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

