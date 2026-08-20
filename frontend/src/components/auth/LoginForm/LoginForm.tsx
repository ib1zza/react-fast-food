import React, { useState } from "react";
import styles from "./LoginForm.module.css";

interface LoginFormProps {
  onSwitchToRegister?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="login-input">
          Логин
        </label>
        <input
          id="login-input"
          type="text"
          className={styles.input}
          placeholder="Введите логин"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="password-input">
          Пароль
        </label>
        <input
          id="password-input"
          type="password"
          className={styles.input}
          placeholder="Введите пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" className={styles.submitBtn}>
        Войти
      </button>

      {onSwitchToRegister && (
        <p className={styles.switchText}>
          Нет аккаунта?{" "}
          <button
            type="button"
            className={styles.switchBtn}
            onClick={onSwitchToRegister}
          >
            Зарегистрироваться
          </button>
        </p>
      )}
    </form>
  );
};
