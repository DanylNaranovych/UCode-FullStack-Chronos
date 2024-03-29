import React, { useState } from "react";

import { useDispatch } from "react-redux";

import { login, registration } from "../store/actions/auth.js";

import styles from "../styles/LoginForm.module.css";

const LoginForm = ({ onLoginSuccess }) => {
  const dispatch = useDispatch();
  const [email, setUserEmail] = useState("");
  const [name, setLogin] = useState("");
  const [fullname, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isLoginFormOpen, setLoginFormOpen] = useState(true);
  const [error, setError] = useState(null);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleUserEmailChange = (e) => setUserEmail(e.target.value);
  const handleLoginChange = (e) => setLogin(e.target.value);
  const handleFullNameChange = (e) => setFullName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handlePasswordConfirmationChange = (e) =>
    setPasswordConfirmation(e.target.value);

  const handleLogin = async () => {
    if (!name || !password) {
      setError("Please fill in all fields");
      return;
    }
    try {
      await dispatch(login(name, password));
      onLoginSuccess();
    } catch (error) {
      console.error("Ошибка при входе:", error);
    }
  };

  const handleRegister = async () => {
    if (!email || !password || !passwordConfirmation || !name) {
      setError("Please fill in all fields.");
      return;
    }

    if (passwordConfirmation !== password) {
      setError("Password and PasswordConfirmation must be equal.");
      return;
    }

    if (password.length < 6) {
      setError("The password must contain more than 5 characters.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email address");
      return;
    }
    try {
      await dispatch(registration(email, password, name, fullname));
      setRegistrationSuccess(true);
    } catch (error) {
      console.error("Ошибка при входе:", error);
    }
  };

  const handleFormToggle = () => {
    setLoginFormOpen(!isLoginFormOpen);
    setError(null);
  };

  const handleOkButtonClick = () => {
    setRegistrationSuccess(false);
    setLoginFormOpen(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        {isLoginFormOpen ? (
          <form className={styles.form}>
            <label className={styles.label}>Login:</label>
            <input
              className={styles.input}
              type="text"
              value={name}
              onChange={handleLoginChange}
            />
            <label className={styles.label}>Password:</label>
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <button
              className={styles.button}
              onClick={handleLogin}
              type="button"
            >
              Login
            </button>
            {error && <div className={styles.error}>{error}</div>}
          </form>
        ) : (
          <form className={styles.form}>
            <label className={styles.label}>Login:</label>
            <input
              className={styles.input}
              type="text"
              value={name}
              onChange={handleLoginChange}
            />
            <label className={styles.label}>Full Name:</label>
            <input
              className={styles.input}
              type="text"
              value={fullname}
              onChange={handleFullNameChange}
            />
            <label className={styles.label}>Email:</label>
            <input
              className={styles.input}
              type="text"
              value={email}
              onChange={handleUserEmailChange}
            />
            <label className={styles.label}>Password:</label>
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <label className={styles.label}>PasswordConfirmation:</label>
            <input
              className={styles.input}
              type="password"
              value={passwordConfirmation}
              onChange={handlePasswordConfirmationChange}
            />
            <button
              className={styles.button}
              onClick={handleRegister}
              type="button"
            >
              Register
            </button>
            {error && <div className={styles.error}>{error}</div>}
          </form>
        )}
        <button className={styles.toggleButton} onClick={handleFormToggle}>
          {isLoginFormOpen ? "Still not registered?" : "Back to login"}
        </button>
      </div>
      {registrationSuccess && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p>Registration Successful!</p>
            <button className={styles.okButton} onClick={handleOkButtonClick}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
