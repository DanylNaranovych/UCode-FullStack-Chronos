import React, { useState, useEffect, useCallback } from "react";
import {
  deleteCalendarById,
  getAllUserCalendars,
} from "../store/actions/calendars";
import { useDispatch, useSelector } from "react-redux";

import styles from "../styles/Sidebar.module.css";

import EventModalForm from "./ModalEventForm.jsx";
import CalendarModalForm from "./ModalCalendarForm.jsx";

import { logout } from "../store/actions/auth.js";

const Sidebar = ({ onLogout, onSelectCalendar, onSelectCategories }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [currentPage, setCurrentPage] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const calendars = useSelector((state) => state.calendars.calendars);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCalendar, setSelectedCalendar] = useState(null);
  const [deleteCalendar, setCalendarToDelete] = useState(null);
  const [categories, setCategories] = useState([]);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(calendars.length / itemsPerPage);

  const handleClickNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const handleClickPrev = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, calendars.length);

  useEffect(() => {
    dispatch(getAllUserCalendars());
    setIsLoading(false);
  }, [dispatch]);

  const memoizedOnSelectCategories = useCallback(
    (selectedCategories) => {
      onSelectCategories(selectedCategories);
    },
    [onSelectCategories]
  );

  useEffect(() => {
    memoizedOnSelectCategories(categories);
  }, [categories, memoizedOnSelectCategories]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleDelete = (calendar) => {
    setCalendarToDelete(calendar);
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    await dispatch(deleteCalendarById(deleteCalendar.id));
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

  const handleCategoriesSelect = (category) => {
    const { id, checked } = category.target;
    if (checked) {
      setCategories((prevSelectedCategories) => [
        ...prevSelectedCategories,
        id,
      ]);
    } else {
      setCategories((prevSelectedCategories) =>
        prevSelectedCategories.filter((category) => category !== id)
      );
    }
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

      <div>
        <ul className={styles.calendarList}>
          {calendars.slice(startIndex, endIndex).map((calendar) => (
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
                <button
                  className={styles.deleteButton}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleDelete(calendar);
                  }}
                >
                  X
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div>
          <div className={styles.paginationContainer}>
            <button
              className={`${styles.paginationButton}`}
              onClick={handleClickPrev}
              disabled={currentPage === 0}
            >
              {"<"}
            </button>
            <button
              className={`${styles.paginationButton}`}
              onClick={handleClickNext}
              disabled={currentPage === totalPages - 1}
            >
              {">"}
            </button>
          </div>
        </div>
      </div>

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
            <input
              type="checkbox"
              id="arrangement"
              onChange={handleCategoriesSelect}
              checked={categories.includes("arrangement")}
            />
            <label htmlFor="arrangements">Arrangements</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="task"
              onChange={handleCategoriesSelect}
              checked={categories.includes("task")}
            />
            <label htmlFor="task">Tasks</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="reminder"
              onChange={handleCategoriesSelect}
              checked={categories.includes("reminder")}
            />
            <label htmlFor="reminders">Reminders</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="holiday"
              onChange={handleCategoriesSelect}
              checked={categories.includes("holiday")}
            />
            <label htmlFor="holiday">Holidays</label>
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
