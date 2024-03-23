import React from "react";
import EventForm from "./EventForm.jsx";
import styles from "../styles/Event.module.css";

const EventModalForm = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <EventForm onClose={onClose} />{" "}
      </div>
    </div>
  );
};

export default EventModalForm;
