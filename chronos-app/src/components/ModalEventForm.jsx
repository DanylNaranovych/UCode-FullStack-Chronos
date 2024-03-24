import React from "react";
import EventForm from "./EventForm.jsx";
import styles from "../styles/Event.module.css";

const EventModalForm = ({ isOpen, onClose, onCreate, calendars }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <EventForm
          onClose={onClose}
          onCreate={onCreate}
          onCancel={onClose}
          calendars={calendars}
        />{" "}
      </div>
    </div>
  );
};

export default EventModalForm;
