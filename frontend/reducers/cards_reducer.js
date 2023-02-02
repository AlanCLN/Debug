import { RECEIVE_CARD,RECEIVE_CARDS, REMOVE_CARD } from "../action/card";

const cardsReducer = (state = {}, action) => {
  Object.freeze(state)
  let newState = Object.assign({},state)
  switch(action.type){
    case RECEIVE_CARD:
      newState[action.card.id] = action.card
      return newState
    case RECEIVE_CARDS:
      newState = action.cards
      return newState
    case REMOVE_CARD:
      delete newState[action.card.id]
      return newState
    default:
      return state
  }
}

export default cardsReducer