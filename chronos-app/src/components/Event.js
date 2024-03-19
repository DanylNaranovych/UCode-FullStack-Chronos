import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/Event.module.css";

const Event = ({ title, start, end, type, onClose }) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <span className={styles.closeButton} onClick={onClose}>
            &times;
          </span>
          <h2>{title} title</h2>
          <p>
            <strong>Start at:</strong> {start}
          </p>
          <p>
            <strong>End at:</strong> {end}
          </p>
          <p>
            <strong>Type:</strong> {type}
          </p>
        </div>
      </div>
    </div>
  );
};

Event.propTypes = {
  title: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Event;
