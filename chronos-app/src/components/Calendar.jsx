import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/Calendar.module.css";
import EventForm from "./EventForm";
import Event from "./Event";
import axios from "axios";

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
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [holidaysArray, setHolidaysArray] = useState(null);
  const events = useSelector((state) => state.event.events);

  useEffect(() => {
    if (selectedCalendar) {
      dispatch(getEventsForCalendar(selectedCalendar.id));
      const fetchData = async () => {
        try {
          const response = await fetch("https://ipapi.co/json/");
          const data = await response.json();
          const country = data.country_code;
          const year = "2024";

          const result = await axios.get(
            `https://api.api-ninjas.com/v1/holidays?country=${country}&year=${year}`,
            {
              headers: {
                "X-Api-Key": "0MBiovU18kls8rixZjnc8w==Mgcf6JOijmRzSGjO",
              },
            }
          );
          setHolidaysArray(result.data);
        } catch (error) {
          console.error("Error: ", error);
        }
      };

      fetchData();
    }
  }, [selectedCalendar, dispatch]);

  useEffect(() => {}, []);

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

  const handleOpenEvent = (event) => {
    if (!selectedDay) {
      setSelectedEvent(event);
    }
  };

  const handleCloseEvent = () => {
    setSelectedEvent(null);
  };

  const handleCreateEventClick = () => {
    setIsEventFormOpen(true);
  };

  const handleCloseModal = () => {
    setIsEventFormOpen(false);
  };

  const renderDays = () => {
    const days = [];
    const today = new Date();

    const openEventForm = (day) => {
      setIsEventFormOpen(true);
      setSelectedDay(day);
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

        const holidaysForDay = holidaysArray
          ? holidaysArray.filter((holiday) => {
              const holidayDate = new Date(holiday.date);
              return (
                holidayDate.getDate() === i &&
                holidayDate.getMonth() === currentDate.getMonth() &&
                holidayDate.getFullYear() === currentDate.getFullYear()
              );
            })
          : [];

        const eventItems = eventsForDay.map((event) => (
          <div
            key={event.eventId}
            className={`${styles.eventMonth}`}
            style={{ backgroundColor: event.color }}
            onClick={(e) => {
              e.stopPropagation();
              handleOpenEvent(event);
            }}
          >
            {event.name}
          </div>
        ));

        const holidayItems = holidaysForDay.map((holiday) => (
          <div
            key={i}
            className={`${styles.eventHoliday}`}
            style={{ backgroundColor: "red" }}
          >
            {holiday.name}
          </div>
        ));

        days.push(
          <div
            key={`current-${i}`}
            className={`${styles.day} ${isToday ? styles.today : ""}`}
            onClick={() => openEventForm(i)}
          >
            <div>{i}</div>
            <div className={styles.eventContainer}>{holidayItems}</div>
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
                          const positionInHour =
                            eventStart.getHours() + eventStart.getMinutes();
                          return (
                            <div
                              key={eventIndex}
                              className={styles.eventWeek}
                              style={{
                                marginTop: `${positionInHour}%`,
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
            onCreate={handleCreateEventClick}
            onCancel={handleCloseModal}
            onClose={() => setIsEventFormOpen(false)}
            calendars={[selectedCalendar]}
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
      {selectedEvent && (
        <Event
          title={selectedEvent.name}
          content={selectedEvent.content}
          start={selectedEvent.start}
          end={selectedEvent.end}
          type={selectedEvent.type}
          calendarId={selectedEvent.calendarId}
          eventId={selectedEvent.eventId}
          onClose={handleCloseEvent}
          onCancel={handleCloseEvent}
        />
      )}

      <div className={styles.days}>{renderDays()}</div>
    </div>
  );
};

export default Calendar;
