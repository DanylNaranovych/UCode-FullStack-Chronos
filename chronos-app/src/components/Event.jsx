import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "../styles/Event.module.css";
import { useDispatch } from "react-redux";
import { deleteEvent } from "../store/actions/event";

const Event = ({
  title,
  content,
  start,
  end,
  type,
  onClose,
  calendarId,
  eventId,
  onCancel,
  onDelete,
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const dispatch = useDispatch();
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

  const handleDelete = (e) => {
    e.stopPropagation();
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    await dispatch(deleteEvent(calendarId, eventId));
    setShowConfirmation(false);
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
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
          <div className={styles.buttonWrapper}>
            <button onClick={handleDelete} className={styles.cancelButton}>
              Delete
            </button>
            <button onClick={onCancel} className={styles.cancelButton}>
              Close
            </button>
          </div>
        </div>
      </div>
      {showConfirmation && (
        <div className={styles.confirmationModal}>
          <div className={styles.confirmationContent}>
            <p>Are you sure you want to delete this event?</p>
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
  onDelete: PropTypes.func,
};

export default Event;
