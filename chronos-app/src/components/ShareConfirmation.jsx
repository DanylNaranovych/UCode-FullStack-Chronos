import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmEvent } from "../store/actions/event";
import { getAllUserCalendars } from "../store/actions/calendars";
import styles from "../styles/ShareConfirmation.module.css"; // импорт модуля стилей
import { useParams } from "react-router-dom"; // импорт useParams для получения токена из URL

const InvitationPage = () => {
  const dispatch = useDispatch();
  const [calendar, setSelectedCalendar] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const calendars = useSelector((state) => state.calendars.calendars);
  const { token } = useParams();

  useEffect(() => {
    dispatch(getAllUserCalendars());
  }, [dispatch]);

  const handleAcceptInvitation = async () => {
    try {
      setSuccessMessage("Success: Event added");
      await dispatch(confirmEvent(calendar, token));
    } catch (error) {
      console.error("Error to confirm", error);
    }
  };

  return (
    <div className={styles.container}>
      {" "}
      {/* Применяем класс container */}
      <h2 className={styles.title}>Choose Calendar</h2>{" "}
      {/* Применяем класс title */}
      <div>
        <select
          id="calendar"
          value={calendar}
          onChange={(e) => setSelectedCalendar(e.target.value)}
          required
          className={styles.selectInput} // Применяем класс selectInput
        >
          <option value="">Select a calendar</option>
          {calendars.map((calendar) => (
            <option key={calendar.id} value={calendar.id}>
              {calendar.name}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleAcceptInvitation} className={styles.submitButton}>
        Submit
      </button>{" "}
      {successMessage && (
        <p className={styles.successMessage}>{successMessage}</p>
      )}{" "}
    </div>
  );
};

export default InvitationPage;
