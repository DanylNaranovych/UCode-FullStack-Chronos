import CalendarsService from "../../services/calendarsService";

export const getAllUserCalendars = () => async (dispatch) => {
  try {
    const response = await CalendarsService.getAllUserCalendars();
    dispatch({ type: "GET_CALENDARS", payload: response.data.calendarsArray });
    return response;
  } catch (error) {
    console.error("Failed to retrieve calendars", error);
  }
};

export const createUserCalendar = (name, description) => async (dispatch) => {
  try {
    await CalendarsService.createUserCalendar(name, description);
    dispatch(getAllUserCalendars());
    // dispatch({ type: "GET_CALENDARS", payload: response.data.calendars });
  } catch (error) {
    console.error("Failed to create a calendar", error);
  }
};

export const deleteCalendarById = (calendarId) => async (dispatch) => {
  try {
    await CalendarsService.deleteCalendarById(calendarId);
    dispatch({
      type: "DELETE_CALENDAR_SUCCESS",
      payload: {
        calendarId: calendarId,
      },
    });
  } catch (error) {
    console.error("Calendar removal failed", error);
    dispatch({
      type: "DELETE_CALENDAR_FAILURE",
      payload: {
        error: error.message,
      },
    });
  }
};

export const updateCalendarById =
  (calendarId, newName, newDescription) => async (dispatch) => {
    try {
      const response = await CalendarsService.updateCalendarById(
        calendarId,
        newName,
        newDescription
      );
      dispatch({ type: "GET_CALENDARS", payload: response.data.calendars });
    } catch (error) {
      console.error("Failed to change the calendar", error);
    }
  };

// TODO - realize all the actions for calendars
