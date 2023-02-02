import { combineReducers } from "redux";
import cardsReducer from "./cards_reducer";
import filesReducer from "./files_reducer";
import replacementsReducer from "./replacements_reducer";
import usersReducer from "./users_reducer";


const entitiesReducer = combineReducers({
  users: usersReducer,
  files: filesReducer,
  replacements: replacementsReducer,
  cards: cardsReducer
})

export default entitiesReducer