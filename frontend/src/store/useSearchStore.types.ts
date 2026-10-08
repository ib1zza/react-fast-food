import { IProduct } from "../types";

export type SearchState = {
  searchOpened: boolean;
  searchQuery: string,
  searchResults: IProduct[],
  setSearchOpened: (type: boolean) => void,
  setSearchQuery: (query: string) => void,
  setSearchResults: (res: IProduct[]) => void,
};
