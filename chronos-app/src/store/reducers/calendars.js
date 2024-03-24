const initialState = {
  calendars: [],
};

const calendarsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CALENDARS":
      return { ...state, calendars: action.payload };
    case "CREATE_CALENDAR":
      return { ...state, calendars: [...state.calendars, action.payload] };
    default:
      return state;
  }
};

export default calendarsReducer;
