import { create } from "zustand";
import { ModalState } from "./useModalStore.types";

export const useModalStore = create<ModalState>((set) => ({
  modalOpened: null,
  modalData: null,
  setModalOpened: (type, data) => set({ modalOpened: type, modalData: data }),
}));
