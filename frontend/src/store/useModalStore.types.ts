import { IModal } from "../types";

export type ModalState = {
  modalOpened: IModal | null;
  setModalOpened: (type: IModal | null) => void;
};
