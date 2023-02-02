import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { getAllCards} from "../../action/card";
import EditCardsContainer from "./EditCardsContainer";
import NewCardsContainer from "./NewCardsContainer";
import NavBar from "../NavBar";

const CardSearch = (props) => {

  useEffect(props.fetchCards,[])

  const [search,updateSearch] = useState('')
  const [openEditForm, toggleEditForm] = useState(false)
  const [openNewForm, toggleNewForm] = useState(false)
  const [cardToEdit, setCardToEdit] = useState(null)

  function _handleUpdateSearch(e){
    updateSearch(e.target.value.toLowerCase())
  }

  function _handleSelectCard(card){
    return ()=>{
      setCardToEdit(card)
      toggleEditForm(true)
    }
  }
  function _handleOpenNewCardForm(){
    toggleNewForm(true)
  }

  const editForm = openEditForm ? (
    <EditCardsContainer
    card={cardToEdit}
    closeForm={toggleEditForm}
    />
  ) : null

  const newForm = openNewForm ? (
    <NewCardsContainer
    closeForm={toggleNewForm}
    />
  ) : null

  const searchResults = search.length > 2 ? (
    Object.values(props.cards).map((card)=>{
      if(card.name.toLowerCase().includes(search)){
        return <li className='search-result'
        key={card.id}
        onClick={_handleSelectCard(card)}
        >
          <p className='card-name'>
            Card Name: {card.name}
          </p>
          <p className='card-category'>
            Category: {card.category}
          </p>
        </li>
      }
    })
  ) : null

  return (
    <div>
      <NavBar/>
      <div id='cards'>
        <div className='search-section'>
          <p className='section-title'>
            Card Search
          </p>
          <p className='btn'
          onClick={_handleOpenNewCardForm}
          >
            Add New Card
          </p>
          <input 
          type="text" 
          placeholder="Search for cards..." 
          onChange={_handleUpdateSearch}
          />
          <ul className='search-results'>
            {searchResults}
          </ul>
          {newForm}
          {editForm}
        </div>
      </div>
    </div>
  )
}

const mstp = (state) => ({
  cards: state.entities.cards
})

const mdtp = (dispatch) => ({
  fetchCards: ()=>dispatch(getAllCards())
})

export default connect(mstp,mdtp)(withRouter(CardSearch))