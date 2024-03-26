const initialState = {
  events: [], // массив событий
  loading: false,
  error: null,
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_EVENTS":
      return { ...state, events: action.payload };
    case "CREATE_EVENT":
      return {
        ...state,
        events: action.payload,
      };
    case "DELETE_EVENT_SUCCESS":
      return {
        ...state,
        events: state.events.filter(
          (event) => event.id !== action.payload.eventId
        ),
      };
    case "DELETE_EVENT_FAILURE":
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default eventReducer;
