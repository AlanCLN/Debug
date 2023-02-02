import React, { useEffect, useState } from "react";

const CardForm = (props) => {

  const [cardName,updateCardName] = useState(props.cardName)
  const [cardCategory,updateCardCategory] = useState(props.cardCategory)

  useEffect(()=>()=>props.clearErrors(),[])

  function _handleClick(){
    const card = {name: cardName, category: cardCategory}
    if(props.cardId) card.id = props.cardId
    props.submitCardData(card)
    props.closeForm(false)
  }
  function _handleFormClose(){
    props.closeForm(false)
  }
  function _handleFormUpdate(type){
    return (e)=>{
      if(type==='name'){
        updateCardName(e.target.value)
      }else{
        updateCardCategory(e.target.value)
      }
    }
  }
  function _handleDelete(){
    props.deleteCard({id: props.cardId})
  }

  const cardNamePlaceholder = props.formType === 'new' ? 'Card Name' : cardName
  const cardCategoryPlaceholder = props.formType === 'new' ? 'Category' : cardCategory
  const addOrUpdate = props.formType === 'new' ? 'Add' : 'Update'
  const deleteButton = props.formType === 'new' ? null : (<p
    className="btn form-btn"
    onClick={_handleDelete}
    >
      Delete
    </p>)
  const errorsText = props.errors?.length === 0 ? null : (
    <ul className='errors'>
      {props.errors?.map(error=><li>{error}</li>)}
    </ul>
  )

  return (
    <div className="modal">
      <div className="form">
        <p className="form-title">{addOrUpdate} Cards</p>
        {errorsText}
        <div className="form-input">
          <input type="text" placeholder={cardNamePlaceholder} onChange={_handleFormUpdate('name')}/>
          <input type="text" placeholder={cardCategoryPlaceholder} onChange={_handleFormUpdate('category')}/>
        </div>
        <div className="form-btns">
          {deleteButton}
          <p className="btn form-btn"
          onClick={_handleClick}
          >
            {addOrUpdate}
          </p>
          <p className="btn form-btn"
          onClick={_handleFormClose}
          >
            Close
          </p>
        </div>
      </div>
    </div>
  )
}

export default CardForm