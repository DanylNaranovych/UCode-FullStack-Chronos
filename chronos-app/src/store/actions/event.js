import EventService from "../../services/eventService";

export const getEventsForCalendar = (calendarId) => async (dispatch) => {
  try {
    const response = await EventService.getEventCalendar(calendarId);
    dispatch({ type: "SET_EVENTS", payload: response.data.eventsArray });
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
      dispatch(getEventsForCalendar(calendarId));
      dispatch({ type: "SET_MESSAGE", payload: response.data });
    } catch (error) {
      console.error("Error: can't create Event", error);
    }
  };

export const deleteEvent = (calendarId, eventId) => async (dispatch) => {
  try {
    await EventService.deleteEvent(calendarId, eventId);
    dispatch({
      type: "DELETE_EVENT_SUCCESS",
      payload: {
        eventId: eventId,
      },
    });
  } catch (error) {
    console.error("Event removal failed", error);
    dispatch({
      type: "DELETE_EVENT_FAILURE",
      payload: {
        error: error.message,
      },
    });
  }
};
