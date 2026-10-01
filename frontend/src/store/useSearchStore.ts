import { create } from "zustand";
import { SearchState } from "./useSearchStore.types";

export const useSearchStore = create<SearchState>((set) => ({
  searchOpened: false,
  setSearchOpened: (type: boolean) => set({ searchOpened: type })
}));