import EventService from "../../services/eventService";

export const getEventsForCalendar = (calendarId) => async (dispatch) => {
  try {
    const response = await EventService.getEventCalendar(calendarId);
    console.log(response);
    dispatch({ type: "SET_EVENTS", payload: response.data });
  } catch (error) {
    console.error("Login failed", error);
  }
};

export const createEvent =
  (calendarId, name, content, start, end, type, color) => async (dispatch) => {
    try {
      const response = await EventService.createEvent(
        calendarId,
        name,
        content,
        start,
        end,
        type,
        color
      );
      console.log(response);
      dispatch({ type: "SET_MESSAGE", payload: response.data });
    } catch (error) {
      console.error("Login failed", error);
    }
  };
