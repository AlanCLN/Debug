import * as FileUtil from '../util/file_util'
import { receiveErrors } from './session'

export const RECEIVE_FILES = "RECEIVE_FILES"
export const RECEIVE_FILE_ERRORS= 'RECEIVE_FILE_ERRORS'
export const CLEAR_FILE_ERRORS = 'RECEIVE_FILE_ERRORS'

export const clearFileErrors = () => ({
  type: CLEAR_FILE_ERRORS
})

export const receiveFiles = files => ({
  type: RECEIVE_FILES,
  files
})

export const receiveFileErrors = error => ({
  type: RECEIVE_FILE_ERRORS,
  error
})

export const sendUnshippedOrders = (file) => (dispatch) => {
  return FileUtil.sendUnshippedOrders(file)
  .then(files=>dispatch(receiveFiles(files)),
    err => dispatch(receiveFileErrors(err.responseJSON)))
};

