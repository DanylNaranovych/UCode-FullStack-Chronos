import React from "react";
import CalendarForm from "./CalendarForm";
import styles from "../styles/Event.module.css";

const CalendarModalForm = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.closeButton} onClick={onClose}>
          &times;
        </div>
        <CalendarForm onClose={onClose} />{" "}
      </div>
    </div>
  );
};

export default CalendarModalForm;
