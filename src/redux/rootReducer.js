import { combineReducers } from "redux";
import UserReducer from "./user/reducer";


const rootReducer = combineReducers({
  user: UserReducer,
  // Add more reducers here if needed
});

export default rootReducer;