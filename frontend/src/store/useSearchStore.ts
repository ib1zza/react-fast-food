import { create } from "zustand";
import { SearchState } from "./useSearchStore.types";

export const useSearchStore = create<SearchState>((set) => ({
  searchOpened: false,
  searchQuery: "",
  searchResults: [],
  setSearchOpened: (type) => set({ searchOpened: type }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSearchResults: (res) => set({ searchResults: res })
}));