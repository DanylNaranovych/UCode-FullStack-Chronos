import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "../styles/CalendarForm.module.css";

const EventForm = ({ onCreate, onCancel }) => {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ title, start, end, type });
    setTitle("");
    setStart("");
    setEnd("");
    setType("");
  };

  return (
    <div className={styles.formOverlay}>
      <div className={styles.form}>
        <span className={styles.closeButton} onClick={onCancel}>
          &times;
        </span>
        <h2>Create Event</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label htmlFor="start">Start:</label>
          <input
            type="datetime-local"
            id="start"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            required
          />

          <label htmlFor="end">End:</label>
          <input
            type="datetime-local"
            id="end"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            required
          />

          <label htmlFor="type">Type:</label>
          <input
            type="text"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />

          <div className={styles.buttons}>
            <button type="submit">Create</button>
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EventForm.propTypes = {
  onCreate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EventForm;
