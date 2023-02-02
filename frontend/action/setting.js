import * as SettingUtil from '../util/setting_util'
import { receiveErrors } from './session'

export const RECEIVE_SETTINGS = 'RECEIVE_SETTINGS'
export const RECEIVE_SETTING = 'RECEIVE_SETTING'

const receiveSetting = setting => ({
    type: RECEIVE_SETTING,
    setting
})

const receiveSettings = settings => ({
    type: RECEIVE_SETTINGS,
    settings
})

export const updateSettings = setting => dispatch => (
    SettingUtil.updateSetting(setting)
        .then(updated_setting => dispatch(receiveSetting(updated_setting)),
            err => dispatch(receiveErrors(err.responseJSON))
        )
)

export const fetchSettings = () => dispatch => (
    SettingUtil.fetchSettings()
        .then(settings=>dispatch(receiveSettings(settings)),
            err=>dispatch(receiveErrors(err.responseJSON))
            )
)