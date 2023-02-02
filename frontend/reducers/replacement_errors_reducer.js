import { CLEAR_REPLACEMENT_ERRORS, RECEIVE_REPLACEMENT, RECEIVE_REPLACEMENT_ERRORS } from "../action/replacement";


const replacementErrorsReducer = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_REPLACEMENT_ERRORS:
            return action.errors
        case RECEIVE_REPLACEMENT:
            return []
        case CLEAR_REPLACEMENT_ERRORS:
            return []
        default:
            return state
        
    }
}

export default replacementErrorsReducer