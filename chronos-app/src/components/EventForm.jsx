import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import styles from "../styles/EventForm.module.css";

import { createEvent } from "../store/actions/event";

const EventForm = ({ onCreate, onCancel, onClose, calendars }) => {
  const dispatch = useDispatch();
  const [calendar, setCalendar] = useState("");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [type, setType] = useState("");
  const [color, setColor] = useState("#000000");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!calendar) {
      console.error("Please select a calendar.");
      return;
    }
    onCreate({ calendar, name, content, start, end, type, color });
    dispatch(createEvent(calendar, name, content, start, end, type, color));
    setCalendar("");
    setName("");
    setContent("");
    setStart("");
    setEnd("");
    setType("");
    setColor("#000000");
    onClose();
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span className={styles.close} onClick={onCancel}>
          &times;
        </span>
        <h2 className={styles.title}>Create Event</h2>
        <form onSubmit={handleSubmit}>
          <select
            id="calendar"
            value={calendar}
            onChange={(e) => setCalendar(e.target.value)}
            required
            className={styles.input}
          >
            <option value="">Select a calendar</option>
            {calendars.map((calendar) => (
              <option key={calendar.id} value={calendar.id}>
                {calendar.name}
              </option>
            ))}
          </select>

          <label htmlFor="name" className={styles.label}>
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={styles.input}
          />

          <label htmlFor="content" className={styles.label}>
            Content:
          </label>
          <input
            type="text"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className={styles.input}
          />

          <label htmlFor="start" className={styles.label}>
            Start:
          </label>
          <input
            type="datetime-local"
            id="start"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            required
            max={end}
            className={styles.input}
          />

          <label htmlFor="end" className={styles.label}>
            End:
          </label>
          <input
            type="datetime-local"
            id="end"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            required
            min={start}
            className={styles.input}
          />

          <label htmlFor="type" className={styles.label}>
            Type:
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className={styles.input}
          >
            <option value="">Select type</option>
            <option value="arrangement">Arrangements</option>
            <option value="task">Tasks</option>
            <option value="reminder">Reminders</option>
          </select>

          <label htmlFor="color" className={styles.label}>
            Color:
          </label>
          <input
            type="color"
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className={styles.colorPicker}
          />

          <div className={styles.buttons}>
            <button type="submit" className={styles.submitButton}>
              Create
            </button>
            <button
              type="button"
              onClick={onCancel}
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

EventForm.propTypes = {
  onCreate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EventForm;
