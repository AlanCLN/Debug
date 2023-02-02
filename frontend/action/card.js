import * as CardUtil from '../util/card_util'
import {receiveErrors } from './session'

export const RECEIVE_CARD = 'RECEIVE_CARD'
export const RECEIVE_CARDS = 'RECEIVE_CARDS'
export const REMOVE_CARD = 'REMOVE_CARD'
export const RECEIVE_CARD_ERRORS = 'RECEIVE_CARD_ERRORS'
export const CLEAR_CARD_ERRORS = 'CLEAR_CARD_ERRORS'

export const receiveCards = cards => ({
  type: RECEIVE_CARDS,
  cards
})

export const receiveCard = card => ({
  type: RECEIVE_CARD,
  card
})

export const removeCard = card => ({
  type: REMOVE_CARD,
  card
})

export const receiveCardErrors = error => ({
  type: RECEIVE_CARD_ERRORS,
  error
})

export const clearCardErrors = ()=>({type: CLEAR_CARD_ERRORS})

export const addNewCard = card => dispatch => (
  CardUtil.addNewCard(card)
    .then(new_card=>dispatch(receiveCard(new_card)),
      err => dispatch(receiveCardErrors(err.responseJSON))
    )
)

export const updateCard = card => dispatch => (
  CardUtil.updateCard(card)
    .then(updated_card=>dispatch(receiveCard(updated_card)),
      err=>dispatch(receiveCardErrors(err.responseJSON))
    )
)

export const getAllCards = () => dispatch => (
  CardUtil.getAllCards()
    .then(cards=>dispatch(receiveCards(cards)),
      err=>dispatch(receiveCardErrors(err.responseJSON))
    )
)

export const deleteCard = card => dispatch => (
  CardUtil.deleteCard(card)
    .then(()=>dispatch(removeCard(card)),
      err=>dispatch(receiveCardErrors(err.responseJSON))
    )
)