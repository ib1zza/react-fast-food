import React, { useEffect } from "react";
import styles from "./AuthModal.module.css";
import { LoginForm } from "../LoginForm/LoginForm";
import { RegisterForm } from "../RegisterForm/RegisterForm";

export type AuthModalMode = "login" | "register";

export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: AuthModalMode;
  onSwitchMode: (mode: AuthModalMode) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  mode,
  onSwitchMode,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Закрыть"
        >
          ✕
        </button>

        <h2 className={styles.title}>
          {mode === "login" ? "Авторизация" : "Регистрация"}
        </h2>

        {mode === "login" ? (
          <LoginForm onSwitchToRegister={() => onSwitchMode("register")} />
        ) : (
          <RegisterForm onSwitchToLogin={() => onSwitchMode("login")} />
        )}
      </div>
    </div>
  );
};
