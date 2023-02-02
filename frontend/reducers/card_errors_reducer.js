import { CLEAR_CARD_ERRORS, RECEIVE_CARD, RECEIVE_CARD_ERRORS } from "../action/card";


const cardErrorsReducer = (state = [], action) => {
    switch(action.type){
        case RECEIVE_CARD_ERRORS:
            return action.errors
        case CLEAR_CARD_ERRORS:
            return []
        case RECEIVE_CARD:
            return []
        default:
            return state
    }
}

export default cardErrorsReducer