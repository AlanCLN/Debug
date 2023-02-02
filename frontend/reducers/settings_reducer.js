import { RECEIVE_SETTING, RECEIVE_SETTINGS } from "../action/setting"




const settingsReducer = (state={}, action) => {
    Object.freeze(state)
    const newState = Object.assign({},state)
    switch(action.type){
        case RECEIVE_SETTING:
            newState[action.setting.setting] = action.setting
            return newState
        case RECEIVE_SETTINGS:
            return action.settings
        default:
            return state
    }
}

export default settingsReducer