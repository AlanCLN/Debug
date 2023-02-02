import * as ReplacementUtil from '../util/replacement_util'

export const RECEIVE_REPLACEMENTS = 'RECEIVE_REPLACEMENTS'
export const RECEIVE_REPLACEMENT = 'RECEIVE_REPLACEMENT'
export const REMOVE_REPLACEMENT = 'REMOVE_REPLACEMENT'
export const RECEIVE_REPLACEMENT_ERRORS = 'RECEIVE_REPLACEMENT_ERRORS'
export const CLEAR_REPLACEMENT_ERRORS = 'CLEAR_REPLACEMENT_ERRORS'

export const receiveReplacements = replacements => ({
  type: RECEIVE_REPLACEMENTS,
  replacements
})

export const receiveReplacement = replacement => ({
  type: RECEIVE_REPLACEMENT,
  replacement
})

export const removeReplacement = replacement => ({
  type: REMOVE_REPLACEMENT,
  replacement
})

export const receiveReplacementErrors = error => ({
  type: RECEIVE_REPLACEMENT_ERRORS,
  error
})

export const clearReplacementErrors = ()=>({type: CLEAR_REPLACEMENT_ERRORS})

export const addNewReplacement = replacement => dispatch => (
  ReplacementUtil.addNewReplacement(replacement)
    .then(replacement => dispatch(receiveReplacement(replacement)),
      err => dispatch(receiveReplacementErrors(err.responseJSON))
    )
)

export const updateReplacement = replacement => dispatch => (
  ReplacementUtil.updateReplacement(replacement)
    .then(replacement => dispatch(receiveReplacement(replacement)),
      err=>dispatch(receiveReplacementErrors(err.responseJSON))
    )
)

export const getAllReplacements = () => (dispatch) => (
  ReplacementUtil.getAllReplacements()
    .then(replacements=>dispatch(receiveReplacements(replacements)),
      err=> dispatch(receiveReplacementErrors(err.responseJSON)))
)

export const deleteReplacement = replacement => dispatch => (
  ReplacementUtil.deleteReplacement(replacement)
    .then(deleted_replacement=>dispatch(removeReplacement(replacement)),
      err=>dispatch(receiveReplacementErrors(err.responseJSON))
    )
)