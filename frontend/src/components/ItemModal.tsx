import React, { useState, useEffect } from "react";
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
  if (!isOpen) return null;
  console.log(modalData)
  return (
    <div className={styles.overlay} onClick={onClose}>
    </div>

  )
}