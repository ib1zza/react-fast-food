import { create } from "zustand";
import { ModalState } from "./useModalStore.types";

export const useModalStore = create<ModalState>((set) => ({
  modalOpened: null,
  setModalOpened: (type) => set({ modalOpened: type }),
}));
