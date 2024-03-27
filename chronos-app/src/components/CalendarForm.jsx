import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "../styles/CalendarForm.module.css";
import { createUserCalendar } from "../store/actions/calendars";

const CalendarForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUserCalendar(title, description));
    setTitle("");
    setDescription("");
    onClose();
  };

  return (
    <div className={styles.formOverlay}>
      <div className={styles.form}>
        <div className={styles.closeButton} onClick={onClose}>
          x
        </div>
        <h2>Create Calendar</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputField}>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.inputField}>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className={styles.textarea}
            ></textarea>
          </div>
          <div className={styles.buttons}>
            <button type="submit" className={styles.submitButton}>
              Create Calendar
            </button>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CalendarForm;
