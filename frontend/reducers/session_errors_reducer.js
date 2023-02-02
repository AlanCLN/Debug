import { CLEAR_ERRORS, RECEIVE_CURRENT_USER, RECEIVE_ERRORS } from "../action/session";


const sessionErrorsReducer = (state = [],action) => {
  Object.freeze(state)
  switch (action.type) {
    case RECEIVE_ERRORS:
      return action.errors
    case RECEIVE_CURRENT_USER:
      return []
    case CLEAR_ERRORS:
      return []
    default:
      return state
  }
}

export default sessionErrorsReducer