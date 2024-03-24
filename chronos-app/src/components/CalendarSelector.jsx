import React, { useState } from "react";

const CalendarSelector = ({ calendars }) => {
  const [selectedCalendar, setSelectedCalendar] = useState(null);

  const handleCalendarSelect = (selectedCalendarId) => {
    setSelectedCalendar(selectedCalendarId);
  };

  return (
    <div>
      {calendars &&
        calendars.map((calendar) => (
          <li key={calendar.id}>
            <label>
              <input
                type="radio"
                name="calendar"
                onChange={() => handleCalendarSelect(calendar.id)}
              />
              {calendar.name}
            </label>
          </li>
        ))}
    </div>
  );
};

export default CalendarSelector;
