import { combineReducers } from "redux";
import authReducer from "./auth.js";
import eventReducer from "./event.js";
import calendarsReducer from "./calendars.js";

const rootReducer = combineReducers({
  auth: authReducer,
  event: eventReducer,
  calendars: calendarsReducer,
});

export default rootReducer;
