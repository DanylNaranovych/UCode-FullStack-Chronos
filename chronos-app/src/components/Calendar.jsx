import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/Calendar.module.css";
import EventForm from "./EventForm";

import { getEventsForCalendar } from "../store/actions/event";

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

const Calendar = ({ selectedCalendar }) => {
  const dispatch = useDispatch();
  const [currentView, setCurrentView] = useState("month");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const events = useSelector((state) => state.event.events.eventsArray);

  useEffect(() => {
    if (selectedCalendar) {
      dispatch(getEventsForCalendar(selectedCalendar.id));
    }
  }, [selectedCalendar, dispatch]);

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

    const openEventForm = (day) => {
      setSelectedDay(day);
      setIsEventFormOpen(true);
    };
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

        const eventsForDay = events
          ? events.filter((event) => {
              const eventDate = new Date(event.start);
              return (
                eventDate.getDate() === i &&
                eventDate.getMonth() === currentDate.getMonth() &&
                eventDate.getFullYear() === currentDate.getFullYear()
              );
            })
          : [];

        const eventItems = eventsForDay.map((event) => (
          <div
            key={event.eventId}
            className={`${styles.event}`}
            style={{ backgroundColor: event.color }}
          >
            {event.name}
          </div>
        ));

        days.push(
          <div
            key={`current-${i}`}
            className={`${styles.day} ${isToday ? styles.today : ""}`}
            onClick={() => openEventForm(i)}
          >
            <div>{i}</div>
            <div className={styles.eventContainer}>{eventItems}</div>
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
        const firstHourOfDay = new Date(firstDayOfWeek);
        const lastHourOfDay = new Date(firstDayOfWeek);
        firstHourOfDay.setHours(0, 0, 0, 0);
        lastHourOfDay.setHours(23, 59, 59, 999);
        const dayEvents =
          events &&
          events.filter((event) => {
            const eventStart = new Date(event.start);
            return eventStart >= firstHourOfDay && eventStart <= lastHourOfDay;
          });

        days.push(
          <div
            key={i}
            className={`${styles.day1} ${isToday ? styles.today : ""}`}
          >
            {firstDayOfWeek.getDate()}
            <div className={styles.hours}>
              {Array.from({ length: 24 }, (_, index) => (
                <div key={index} className={styles.hour}>
                  {index}:00
                  <div className={styles.eventsContainer}>
                    {dayEvents &&
                      dayEvents.map((event, eventIndex) => {
                        const eventStart = new Date(event.start);
                        if (eventStart.getHours() === index) {
                          return (
                            <div
                              key={eventIndex}
                              className={styles.event}
                              style={{
                                top: `${(eventStart.getMinutes() / 60) * 100}%`,
                                backgroundColor: event.color,
                              }}
                            >
                              <span className={styles.eventText}>
                                {event.name}
                              </span>
                            </div>
                          );
                        }
                        return null;
                      })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        firstDayOfWeek.setDate(firstDayOfWeek.getDate() + 1);
      }
    } else if (currentView === "day") {
      const hours = [];

      for (let hour = 0; hour < 24; hour++) {
        hours.push(
          <div key={hour} className={styles.hour}>
            {hour}:00
          </div>
        );
      }
      const todayString = `${currentDate.getDate()}.${
        currentDate.getMonth() + 1
      }.${currentDate.getFullYear()}`;
      const dayAndHours = (
        <div className={styles.oneday}>
          <div>{todayString}</div>
          <div className={styles.hours}>{hours}</div>
        </div>
      );
      days.push(dayAndHours);
    }

    return days;
  };

  return (
    <div className={styles.calendar}>
      <>
        {isEventFormOpen && (
          <EventForm
            selectedDay={selectedDay}
            onClose={() => setIsEventFormOpen(false)}
          />
        )}
      </>
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

      {currentView !== "day" && (
        <div className={styles.weekdays}>
          {weekdays.map((weekday, index) => (
            <div key={index}>{weekday}</div>
          ))}
        </div>
      )}

      <div className={styles.days}>{renderDays()}</div>
    </div>
  );
};

export default Calendar;
