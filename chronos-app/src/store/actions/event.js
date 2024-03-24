import EventService from "../../services/eventService";

export const getEventsForCalendar = (calendarId) => async (dispatch) => {
  try {
    const response = await EventService.getEventCalendar(calendarId);
    dispatch({ type: "SET_EVENTS", payload: response.data });
  } catch (error) {
    console.error("Getting events for calendar error", error);
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
      console.error("Error: can't create Event", error);
    }
  };
