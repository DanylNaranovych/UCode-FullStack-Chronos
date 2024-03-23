import React, { useState } from "react";
import styles from "../styles/EventForm.module.css";

const EventForm = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitle("");
    setDate("");
    setDescription("");
    setColor("");
  };

  console.log(onClose);

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <div className={styles.closeButton} onClick={onClose}>
            x
          </div>
          <div className={styles.inputField}>
            <label className={styles.inputLabel} htmlFor="title">
              Title:
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.inputField}>
            <label className={styles.inputLabel} htmlFor="date">
              Date:
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.inputField}>
            <label className={styles.inputLabel} htmlFor="description">
              Description:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.textarea}
              required
            ></textarea>
          </div>
          <div className={styles.inputField}>
            <label className={styles.inputLabel} htmlFor="color">
              Color:
            </label>
            <input
              type="color"
              id="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className={styles.colorPicker}
              required
            />
          </div>
          <button className={styles.submitButton} type="submit">
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
