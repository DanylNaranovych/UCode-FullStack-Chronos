import React, { useState, useEffect } from "react";
import {
  deleteCalendarById,
  getAllUserCalendars,
} from "../store/actions/calendars";
import { useDispatch, useSelector } from "react-redux";

import styles from "../styles/Sidebar.module.css";

import EventModalForm from "./ModalEventForm.jsx";
import CalendarModalForm from "./ModalCalendarForm.jsx";

import { logout } from "../store/actions/auth.js";

const Sidebar = ({ onLogout, onSelectCalendar }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const calendars = useSelector((state) => state.calendars.calendars);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCalendar, setSelectedCalendar] = useState(null);

  useEffect(() => {
    dispatch(getAllUserCalendars());
    setIsLoading(false);
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleDelete = () => {
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    await dispatch(deleteCalendarById(selectedCalendar.id));
    setShowConfirmation(false);
  };

  const handleCreateEventClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logout());
      onLogout();
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  const handleCreateCalendarClick = () => {
    setIsCalendarModalOpen(true);
  };

  const handleCalendarSelect = (calendar) => {
    setSelectedCalendar(calendar);
    onSelectCalendar(calendar);
  };

  return (
    <div className={`${styles.sidebar} ${styles.close}`}>
      <div className={styles["user-profile"]}>
        <img src="default_avatar.png" alt="Avatar" className={styles.avatar} />
        {user ? <div>{user.login}</div> : <p>Error.</p>}
      </div>
      <div>
        <button
          className={styles.createEventButton}
          onClick={handleCreateCalendarClick}
        >
          Create Calendar
        </button>
        <CalendarModalForm
          isOpen={isCalendarModalOpen}
          onClose={() => setIsCalendarModalOpen(false)}
        />
      </div>
      <div>
        <button
          className={styles.createEventButton}
          onClick={handleCreateEventClick}
        >
          Create Event
        </button>
        <EventModalForm
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onCreate={handleCreateEventClick}
          calendars={calendars}
        />
      </div>

      <ul className={styles.calendarList}>
        {calendars &&
          calendars.map((calendar) => (
            <li key={calendar.id} className={styles.calendarListItem}>
              <div
                className={`${styles.calendarItem} ${
                  selectedCalendar === calendar ? styles.selected : ""
                }`}
                onClick={() => handleCalendarSelect(calendar)}
              >
                <label>
                  <input
                    type="radio"
                    name="calendar"
                    defaultChecked={calendars.indexOf(calendar) === 0}
                  />
                  {calendar.name}
                </label>
                <button onClick={() => handleDelete(calendar)}>X</button>
              </div>
            </li>
          ))}
      </ul>

      {showConfirmation && (
        <div className={styles.confirmationModal}>
          <div className={styles.confirmationContent}>
            <p>Are you sure you want to delete this calendar?</p>
            <div className={styles.confirmationButtons}>
              <button
                onClick={confirmDelete}
                className={styles.confirmationButton}
              >
                Yes, delete
              </button>
              <button
                onClick={() => setShowConfirmation(false)}
                className={styles.confirmationButton}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={styles["category-list"]}>
        <ul>
          <h3>Categories</h3>
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
      <button className={styles.logoutButton} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
