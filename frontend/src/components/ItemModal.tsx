import React from "react";
import styles from "./cart/CartModal/CartModal.module.css";
import { useModalStore } from "../store/useModalStore";

export interface ItemModalProps {
  isOpen: boolean,
  onClose: () => void,
}

export const ItemModal: React.FC<ItemModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { modalData } = useModalStore();
  if (!isOpen || !modalData) return null;
  console.log(modalData)
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.itemModal}>
        <img src={modalData.image} className={styles.itemImage} />
        <div className={styles.modalContent}>
          <div className={styles.modalContentText}>
            <div className={styles.title}>{modalData.name}</div>
            <div className={styles.categoryName}>{modalData.categoryName}</div>
          </div>
          <div className={styles.modalContentButtons}>
            <div>buttons</div>
          </div>
        </div>
      </div>
    </div>

  )
}