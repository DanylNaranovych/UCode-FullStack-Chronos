const initialState = {
  calendars: [],
};

const getCalendarsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CALENDARS":
      return { ...state, calendars: action.payload };
    default:
      return state;
  }
};

export default getCalendarsReducer;
