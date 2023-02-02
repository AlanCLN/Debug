export const addNewCard= (card)=>(
  $.ajax({
    url: 'api/cards',
    method: 'post',
    data: {card}
  })
)

export const getAllCards = () => (
  $.ajax({
    url: 'api/cards',
    method: 'get'
  })
)

export const updateCard = (card) => (
  $.ajax({
    url: `api/cards/${card.id}`,
    method: 'put',
    data: {card}
  })
)

export const deleteCard = (card) => (
  $.ajax({
    url: `api/cards/${card.id}`,
    method: 'delete'
  })
)