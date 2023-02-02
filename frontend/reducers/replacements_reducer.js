import { RECEIVE_REPLACEMENT, RECEIVE_REPLACEMENTS, REMOVE_REPLACEMENT } from "../action/replacement"

const replacementsReducer = (state = {},action) => {
  Object.freeze(state)
  let newState = Object.assign({},state)
  switch(action.type){
    case RECEIVE_REPLACEMENTS:
      newState = action.replacements
      return newState

    case RECEIVE_REPLACEMENT:
      newState[action.replacement.find] = action.replacement
      return newState

    case REMOVE_REPLACEMENT:
      delete newState[action.replacement.find]
      return newState
    default:
      return state
  }
}

export default replacementsReducer
