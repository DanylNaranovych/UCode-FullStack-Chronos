import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "../styles/Event.module.css";

const Event = ({ title, content, start, end, type, onClose, onCancel }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const handleDelete = () => {
    // Определите вашу логику удаления здесь
    // Например, вызовите функцию onDelete, переданную из родительского компонента
    // onDelete();
    // Закрываем модальное окно подтверждения
    setShowConfirmation(false);
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal}>
        <span className={styles.closeButton} onClick={onClose}>
          &times;
        </span>
        <div className={styles.content}>
          <div className={styles.header}>
            <h2>{title}</h2>
            <h3>{type}</h3>
          </div>
          <div className={styles.timeWrapper}>
            <p className={styles.time}>{formatDate(start)}</p>
            <p className={styles.time}>-------</p>
            <p className={styles.time}>{formatDate(end)}</p>
          </div>
          <div className={styles.body}>
            <div className={styles.contentWrapper}>
              <span>{content}</span>
            </div>
          </div>
          <button
            onClick={() => setShowConfirmation(true)}
            className={styles.cancelButton}
          >
            Delete
          </button>
          <button onClick={onCancel} className={styles.cancelButton}>
            Close
          </button>
        </div>
      </div>
      {showConfirmation && (
        <div className={styles.confirmationModal}>
          <div className={styles.confirmationContent}>
            <p>Are you sure you want to delete this event?</p>
            <div className={styles.confirmationButtons}>
              <button
                onClick={handleDelete}
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
    </div>
  );
};

Event.propTypes = {
  title: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
};

export default Event;
