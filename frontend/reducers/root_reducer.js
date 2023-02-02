import { combineReducers } from "redux";
import entitiesReducer from "./entities_reducer";
import errorReducer from "./errors_reducer";
import sessionReducer from "./session_reducer";
import settingsReducer from "./settings_reducer";

const rootReducer = combineReducers({
  entities: entitiesReducer,
  errors: errorReducer,
  settings: settingsReducer,
  session: sessionReducer
})

export default rootReducer