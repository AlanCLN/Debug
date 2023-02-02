import { combineReducers } from "redux";
import cardErrorsReducer from "./card_errors_reducer";
import fileErrorsReducer from "./file_errors_reducer";
import replacementErrorsReducer from "./replacement_errors_reducer";
import sessionErrorsReducer from "./session_errors_reducer";

const errorReducer = combineReducers({
  session_errors: sessionErrorsReducer,
  replacement_errors: replacementErrorsReducer,
  card_errors: cardErrorsReducer,
  file_errors: fileErrorsReducer
})

export default errorReducer