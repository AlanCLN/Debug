import { RECEIVE_CONFIRMATION_FILE, RECEIVE_FILES} from "../action/file";
import { LOGOUT_CURRENT_USER } from "../action/session";

const defaultState = {
  confirmation_file: null,
  pullsheet: null,
  packing_slips: null
}

const filesReducer = (state = defaultState, action) => {
  Object.freeze(state)
  let newState = Object.assign({},state)
  switch (action.type){
    case RECEIVE_FILES:
      newState.confirmation_file = action.files.confirmation_file
      newState.pullsheet = action.files.pullsheet
      newState.packing_slips = action.files.packing_slips
      return newState
    case LOGOUT_CURRENT_USER:
      return defaultState
    default:
      return state
  }
}

export default filesReducer