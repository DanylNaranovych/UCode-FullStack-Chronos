import React, { useState } from "react";

import styles from "../styles/Calendar.module.css";

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const getMonthName = (monthNumber) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return months[monthNumber];
};

const Calendar = () => {
  const [currentView, setCurrentView] = useState("month"); // Добавляем состояние для текущего представления календаря
  const [currentDate, setCurrentDate] = useState(new Date());

  const goToPrevious = () => {
    if (currentView === "month") {
      setCurrentDate((prevDate) => {
        const prevMonth = new Date(
          prevDate.getFullYear(),
          prevDate.getMonth() - 1,
          1
        );
        return prevMonth;
      });
    } else if (currentView === "week") {
      setCurrentDate(
        (prevDate) =>
          new Date(
            prevDate.getFullYear(),
            prevDate.getMonth(),
            prevDate.getDate() - 7
          )
      );
    } else if (currentView === "day") {
      setCurrentDate(
        (prevDate) =>
          new Date(
            prevDate.getFullYear(),
            prevDate.getMonth(),
            prevDate.getDate() - 1
          )
      );
    }
  };

  const goToNext = () => {
    if (currentView === "month") {
      setCurrentDate((prevDate) => {
        const nextMonth = new Date(
          prevDate.getFullYear(),
          prevDate.getMonth() + 1,
          1
        );
        return nextMonth;
      });
    } else if (currentView === "week") {
      setCurrentDate(
        (prevDate) =>
          new Date(
            prevDate.getFullYear(),
            prevDate.getMonth(),
            prevDate.getDate() + 7
          )
      );
    } else if (currentView === "day") {
      setCurrentDate(
        (prevDate) =>
          new Date(
            prevDate.getFullYear(),
            prevDate.getMonth(),
            prevDate.getDate() + 1
          )
      );
    }
  };

  const renderDays = () => {
    const days = [];
    const today = new Date();
    if (currentView === "month") {
      const firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      const lastDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      );
      const firstWeekdayIndex = firstDayOfMonth.getDay();
      const offset = firstWeekdayIndex === 0 ? 6 : firstWeekdayIndex - 1;

      const lastDayOfPreviousMonth = new Date(firstDayOfMonth);
      lastDayOfPreviousMonth.setDate(0);
      const daysInPreviousMonth = lastDayOfPreviousMonth.getDate();
      for (
        let i = daysInPreviousMonth - offset + 1;
        i <= daysInPreviousMonth;
        i++
      ) {
        days.push(
          <div
            key={`prev-${i}`}
            className={`${styles.day} ${styles.prevMonth}`}
          >
            {i}
          </div>
        );
      }

      for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
        const isToday =
          currentDate.getFullYear() === today.getFullYear() &&
          currentDate.getMonth() === today.getMonth() &&
          i === today.getDate();

        days.push(
          <div
            key={`current-${i}`}
            className={`${styles.day} ${isToday ? styles.today : ""}`}
          >
            {i}
          </div>
        );
      }
    } else if (currentView === "week") {
      const firstDayOfWeek = new Date(currentDate);
      const dayOfWeek = currentDate.getDay();
      const diff =
        currentDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
      firstDayOfWeek.setDate(diff);
      const lastDayOfWeek = new Date(firstDayOfWeek);
      lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);
      for (let i = 0; i < 7; i++) {
        const isToday =
          currentDate.getFullYear() === today.getFullYear() &&
          currentDate.getMonth() === today.getMonth() &&
          firstDayOfWeek.getDate() === today.getDate();
        days.push(
          <div
            key={i}
            className={`${styles.day} ${isToday ? styles.today : ""}`}
          >
            {firstDayOfWeek.getDate()}
            <div className={styles.hours}>
              {Array.from({ length: 24 }, (_, index) => (
                <div key={index} className={styles.hour}>
                  {index}:00
                </div>
              ))}
            </div>
          </div>
        );
        firstDayOfWeek.setDate(firstDayOfWeek.getDate() + 1);
      }
    } else if (currentView === "day") {
      days.push(
        <div key={currentDate.getDate()} className={styles.day}>
          {currentDate.getDate()}
        </div>
      );
    }
    return days;
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.navigation}>
        <button className={styles.button} onClick={goToPrevious}>
          Prev
        </button>
        <button className={styles.button} onClick={goToNext}>
          Next
        </button>
      </div>
      <div className={styles.viewButtons}>
        <button
          className={styles.button}
          onClick={() => setCurrentView("month")}
        >
          Month
        </button>
        <button
          className={styles.button}
          onClick={() => setCurrentView("week")}
        >
          Week
        </button>
        <button className={styles.button} onClick={() => setCurrentView("day")}>
          Day
        </button>
      </div>

      <h2 className={styles.heading}>{`${getMonthName(
        currentDate.getMonth()
      )} ${currentDate.getFullYear()}`}</h2>
      <div className={styles.weekdays}>
        {weekdays.map((weekday) => (
          <div key={weekday}>{weekday}</div>
        ))}
      </div>
      <div className={styles.days}>{renderDays()}</div>
    </div>
  );
};

export default Calendar;
