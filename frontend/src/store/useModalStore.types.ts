import { IModal, IProduct } from "../types";

export type ModalState = {
  modalOpened: IModal | null;
  modalData: IProduct | null;
  setModalOpened: (type: IModal | null,
    data?: IProduct | null) => void;
};
