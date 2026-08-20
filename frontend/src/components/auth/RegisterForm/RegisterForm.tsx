import React, { useState } from "react";
import styles from "./RegisterForm.module.css";
import { registerUser } from "../../../api/authApi";
import { useUser } from "../../../data/useUser";

interface RegisterFormProps {
  onSwitchToLogin?: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSwitchToLogin,
}) => {
  const userControls = useUser();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await registerUser(login, password);

    if (res) {
      localStorage.setItem("token", res.token);
      userControls.setUser(res.user);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="reg-login-input">
          Логин
        </label>
        <input
          id="reg-login-input"
          type="text"
          className={styles.input}
          placeholder="Придумайте логин"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="reg-password-input">
          Пароль
        </label>
        <input
          id="reg-password-input"
          type="password"
          className={styles.input}
          placeholder="Придумайте пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button type="submit" className={styles.submitBtn}>
        Зарегистрироваться
      </button>

      {onSwitchToLogin && (
        <p className={styles.switchText}>
          Уже есть аккаунт?{" "}
          <button
            type="button"
            className={styles.switchBtn}
            onClick={onSwitchToLogin}
          >
            Войти
          </button>
        </p>
      )}
    </form>
  );
};
