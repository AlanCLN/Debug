import { CLEAR_FILE_ERRORS, RECEIVE_FILES, RECEIVE_FILE_ERRORS } from "../action/file"

const fileErrorsReducer = (state=[],action) => {
    switch(action.type){
        case RECEIVE_FILE_ERRORS:
            return action.error
        case CLEAR_FILE_ERRORS:
            return []
        case RECEIVE_FILES:
            return []
        default:
            return state
    }
}

export default fileErrorsReducer