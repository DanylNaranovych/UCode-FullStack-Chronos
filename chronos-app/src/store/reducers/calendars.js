const initialState = {
  calendars: [],
};

const calendarsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CALENDARS":
      return { ...state, calendars: action.payload };
    case "CREATE_CALENDAR":
      return { ...state, calendars: [...state.calendars, action.payload] };
    case "DELETE_CALENDAR_SUCCESS":
      return {
        ...state,
        calendars: state.calendars.filter(
          (calendar) => calendar.id !== action.payload.calendarId
        ),
      };
    case "DELETE_CALENDAR_FAILURE":
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default calendarsReducer;
