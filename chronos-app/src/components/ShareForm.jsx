import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { shareEvent } from "../store/actions/event";
import styles from "../styles/ShareForm.module.css"; // Импорт стилей

const InvitationForm = ({ eventId, onClose }) => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await dispatch(shareEvent(eventId, email));
      setSubmitSuccess(true);
      setEmail("");
    } catch (error) {
      console.error("The invitation error", error);
    }

    setIsSubmitting(false);
  };

  return (
    <div className={styles["invitation-modal"]}>
      <h2>Share Event By Email</h2>
      {submitSuccess ? (
        <div>
          <p>The invitation has been sent successfully!!</p>
          <button onClick={onClose}>OK</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send"}
          </button>
          <button className={styles["close-button"]} onClick={onClose}>
            Close
          </button>
        </form>
      )}
    </div>
  );
};

export default InvitationForm;
