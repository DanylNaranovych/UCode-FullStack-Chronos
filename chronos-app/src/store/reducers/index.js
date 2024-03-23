import { combineReducers } from "redux";
import authReducer from "./auth.js";
import eventReducer from "./event.js";

const rootReducer = combineReducers({
  auth: authReducer,
  event: eventReducer,
});

export default rootReducer;
