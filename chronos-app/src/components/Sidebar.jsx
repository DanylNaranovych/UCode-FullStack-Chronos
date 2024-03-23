import React, { useState } from "react";
import AuthService from "../services/authService.js";

import styles from "../styles/Sidebar.module.css";

import EventModalForm from "./ModalEventForm.jsx";

const Sidebar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateEventClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      console.log("Вы успешно вышли из системы.");
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  return (
    <div className={`${styles.sidebar} ${styles.close}`}>
      <div className={styles["user-profile"]}>
        <img src="avatar.jpg" alt="Avatar" className={styles.avatar} />
        <span className={styles.username}>Login</span>
      </div>

      <button className={styles.logoutButton} onClick={handleLogout}>
        Logout
      </button>

      <div className={styles["calendar-list"]}>
        <h3>My Calendars</h3>
        <ul>
          <li>
            <label>
              <input type="checkbox" /> Calendar 1
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" /> Calendar 2
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" /> Calendar 3
            </label>
          </li>
        </ul>
      </div>

      <div>
        <button
          className={styles.createEventButton}
          onClick={handleCreateEventClick}
        >
          Create Event
        </button>
        <EventModalForm isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>

      <div className={styles["category-list"]}>
        <h3>Categories</h3>
        <ul>
          <li>
            <input type="checkbox" id="arrangements" />
            <label htmlFor="arrangements">Arrangements</label>
          </li>
          <li>
            <input type="checkbox" id="tasks" />
            <label htmlFor="tasks">Tasks</label>
          </li>
          <li>
            <input type="checkbox" id="reminders" />
            <label htmlFor="reminders">Reminders</label>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
