import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import { loginUser } from "../../../api/authApi";
import { useUser } from "../../../data/useUser";

interface LoginFormProps {
  onSwitchToRegister?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const userControls = useUser();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await loginUser(login, password);

    if (res) {
      localStorage.setItem("token", res.token);
      userControls.setUser(res.user);
    }
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
