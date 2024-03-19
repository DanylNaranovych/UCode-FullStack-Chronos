import React from "react";
import styles from "../styles/Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={`${styles.sidebar} ${styles.close}`}>
      <div className={styles["user-profile"]}>
        <img src="avatar.jpg" alt="Avatar" className={styles.avatar} />
        <span className={styles.username}>Login</span>
      </div>
      <button className={styles.logoutButton}>Logout</button>

      <div className={styles["calendar-list"]}>
        <h3>My Calendars</h3>
        <ul>
          <li>Calendar 1</li>
          <li>Calendar 2</li>
          <li>Calendar 3</li>
        </ul>
      </div>

      <button className={styles.createEventButton}>Create Event</button>

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
