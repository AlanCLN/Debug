import * as APIUtil from '../util/session_api_util'
import * as UserUtil from '../util/user_util'


export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER"
export const RECEIVE_ERRORS = "RECEIVE_ERRORS"
export const LOGOUT_CURRENT_USER = "LOGOUT_CURRENT_USER"
export const CLEAR_ERRORS = 'CLEAR_ERRORS'
export const UPDATE_SUCCESSFUL = 'UPDATE_SUCCESSFUL'
export const CLEAR_SAVED = 'CLEAR_SAVED'

export const receiveCurrentUser = (user) => ({
    type: RECEIVE_CURRENT_USER,
    user
})

export const receiveErrors = (errors) => ({
    type: RECEIVE_ERRORS,
    errors
})

export const clearErrors = () => ({
    type: CLEAR_ERRORS
})

export const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER
})

export const userUpdated = () => ({type: UPDATE_SUCCESSFUL})

export const clearSaved = () => ({type: CLEAR_SAVED})

export const login = (user) => (dispatch) => (
    APIUtil.login(user)
        .then((response) => dispatch(receiveCurrentUser(response)),
                err => dispatch(receiveErrors(err.responseJSON)))
)

export const logout = () => (dispatch) => (
    APIUtil.logout()
        .then(() => dispatch(logoutCurrentUser()),
                err => dispatch(receiveErrors(err.responseJSON)))
)

export const signup = (user) => (dispatch) => (
    APIUtil.signup(user)
        .then(response => dispatch(receiveCurrentUser(response)),
                err => dispatch(receiveErrors(err.responseJSON)))
)


export const updateUser = (user) => (dispatch) => UserUtil.patchUser(user).then((response)=> {
    dispatch(receiveCurrentUser(response))
    dispatch(userUpdated())
},err=>dispatch(receiveErrors(err.responseJSON)))
