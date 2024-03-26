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

const Calendar = ({ selectedCalendar, selectedCategories }) => {
  const dispatch = useDispatch();
  const [currentView, setCurrentView] = useState("month");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [holidaysArray, setHolidaysArray] = useState(null);
  const storeEvents = useSelector((state) => state.event.events);
  let events = storeEvents;
  if (selectedCategories.length === 1 && selectedCategories[0] === "holiday") {
    events = storeEvents;
  } else if (selectedCategories.length > 0) {
    events = storeEvents.filter((event) => {
      return event.type && selectedCategories.includes(event.type);
    });
  }

  useEffect(() => {
    if (selectedCalendar) {
      dispatch(getEventsForCalendar(selectedCalendar.id));
      if (selectedCategories.includes("holiday")) {
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
      } else {
        setHolidaysArray(null);
      }
    }
  }, [selectedCalendar, selectedCategories, dispatch]);
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

  const handleCreateEventClick = () => {
    if (selectedCalendar) {
      setIsEventFormOpen(true);
    }
  };

  const handleCloseEvent = () => {
    setSelectedEvent(null);
  };

  const openEventForm = (day) => {
    if (selectedCalendar) {
      setIsEventFormOpen(true);
      setSelectedDay(day);
    }
  };

  const handleCloseModal = () => {
    setIsEventFormOpen(false);
    setSelectedDay(null);
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
      const dayOfWeek = firstDayOfWeek.getDay();
      const diff = 1 - dayOfWeek;
      firstDayOfWeek.setDate(firstDayOfWeek.getDate() + diff);

      for (let i = 0; i < 7; i++) {
        const isToday =
          firstDayOfWeek.getFullYear() === today.getFullYear() &&
          firstDayOfWeek.getMonth() === today.getMonth() &&
          firstDayOfWeek.getDate() === today.getDate();

        const dayEvents = events.filter((event) => {
          const eventStart = new Date(event.start);
          return (
            eventStart.getDate() === firstDayOfWeek.getDate() &&
            eventStart.getMonth() === firstDayOfWeek.getMonth() &&
            eventStart.getFullYear() === firstDayOfWeek.getFullYear()
          );
        });
        days.push(
          <div
            key={i}
            className={`${styles.dayWeek} ${isToday ? styles.today : ""}`}
          >
            {firstDayOfWeek.getDate()}
            <div className={styles.hours}>
              {Array.from({ length: 24 }, (_, index) => {
                const currentHourEvents = dayEvents.filter((event) => {
                  const eventStart = new Date(event.start);
                  return eventStart.getHours() === index;
                });
                return (
                  <div
                    key={index}
                    className={styles.hour}
                    onClick={() => openEventForm()}
                  >
                    <div className={styles.time}>{index}:00</div>
                    <div className={styles.eventsContainer}>
                      {currentHourEvents.map((event, eventIndex) => {
                        const eventStart = new Date(event.start);
                        const eventEnd = new Date(event.end);
                        const eventDuration =
                          (eventEnd - eventStart) / (1000 * 60 * 60);
                        let positionInHour = 0;

                        const minutesInHour = eventStart.getMinutes();
                        if (minutesInHour === 0) {
                          positionInHour = -50;
                        } else if (minutesInHour === 60) {
                          positionInHour = 50;
                        } else {
                          positionInHour = (100 / 60) * minutesInHour - 50;
                        }
                        const eventWidth = 100 / currentHourEvents.length;
                        const eventHeight = eventDuration * 100;
                        return (
                          <div
                            key={eventIndex}
                            className={styles.eventWeek}
                            style={{
                              top: `${positionInHour}px`,
                              height: `${eventHeight}px`,
                              left: `${eventIndex * eventWidth}%`,
                              backgroundColor: event.color,
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenEvent(event);
                            }}
                          >
                            <span className={styles.eventText}>
                              {event.name}
                            </span>
                            <div className={styles.overlay}></div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

        firstDayOfWeek.setDate(firstDayOfWeek.getDate() + 1);
      }
    } else if (currentView === "day") {
      const selectedDay = new Date(currentDate);

      const dayEvents = events.filter((event) => {
        const eventStart = new Date(event.start);
        return (
          eventStart.getDate() === selectedDay.getDate() &&
          eventStart.getMonth() === selectedDay.getMonth() &&
          eventStart.getFullYear() === selectedDay.getFullYear()
        );
      });

      return (
        <div className={styles.oneDay}>
          <div className={styles.dayHeader}>
            {selectedDay.toLocaleDateString(undefined, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <div className={styles.hours}>
            {Array.from({ length: 24 }, (_, index) => {
              const currentHourEvents = dayEvents.filter((event) => {
                const eventStart = new Date(event.start);
                return eventStart.getHours() === index;
              });
              return (
                <div
                  key={index}
                  className={styles.hour}
                  onClick={() => openEventForm()}
                >
                  <div className={styles.time}>{index}:00</div>
                  <div className={styles.eventsContainer}>
                    {currentHourEvents.map((event, eventIndex) => {
                      const eventStart = new Date(event.start);
                      const eventEnd = new Date(event.end);
                      const eventDuration =
                        (eventEnd - eventStart) / (1000 * 60 * 60);
                      let positionInHour = 0;

                      const minutesInHour = eventStart.getMinutes();
                      if (minutesInHour === 0) {
                        positionInHour = -50;
                      } else if (minutesInHour === 60) {
                        positionInHour = 50;
                      } else {
                        positionInHour = (100 / 60) * minutesInHour - 50;
                      }
                      const eventWidth = 100 / currentHourEvents.length;
                      const eventHeight = eventDuration * 100;
                      return (
                        <div
                          key={eventIndex}
                          className={styles.eventWeek}
                          style={{
                            top: `${positionInHour}px`,
                            height: `${eventHeight}px`,
                            left: `${eventIndex * eventWidth}%`,
                            backgroundColor: event.color,
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenEvent(event);
                          }}
                        >
                          <span className={styles.eventText}>{event.name}</span>
                          <div className={styles.overlay}></div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
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
      {currentView !== "day" && (
        <div className={styles.days}>{renderDays()}</div>
      )}
      {currentView === "day" && (
        <div className={styles.oneDay}>{renderDays()}</div>
      )}
    </div>
  );
};

export default Calendar;
