import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { getAllReplacements } from '../../action/replacement'
import EditReplacementsContainer from './EditReplacementsContainer'
import NewReplacementContainer from '../replacements/NewReplacementContainer'
import NavBar from '../NavBar'

const ReplacementSearch = (props) => {

  const [search,updateSearch] = useState('')
  const [showEditForm,toggleEditForm] = useState(false)
  const [replacementToEdit, setReplacementToEdit] = useState(null)
  const [showNewForm,toggleNewForm] = useState(false)


  useEffect(()=>{
    props.fetchReplacements()
  },[])

  function _handleUpdate(e){
    updateSearch(e.target.value.toLowerCase())
  }

  function _selectSearchResult(replacement){
    return ()=>{
      setReplacementToEdit(replacement)
      toggleEditForm(true)
    }
  }

  function _toggleEditForm(){
    setReplacementToEdit(null)
    toggleEditForm(false)
  }

  function _openNewReplacementModal(){
    toggleNewForm(true)
  }

  const searchResults = search.length>2 ? Object.keys(props.replacements).map((find)=>{
    if(find.length>=search.length) {
      for(let word of find.split(' ')){
        if(word.length>=search.length){
          if(word.slice(0,search.length).toLowerCase() === search){
            return(
              <li 
              key={props.replacements[find].id}
              className='search-result'
              onClick={_selectSearchResult(props.replacements[find])}
              >
                <p className='find-result'>
                  Find: {props.replacements[find].find}
                </p>
                <p className='replace-result'>
                  Replace: {props.replacements[find].replace}
                </p>
              </li>
            )
          }
        }
      }
    }
  }) : null

  const editReplacementForm = showEditForm ? (
    <EditReplacementsContainer
    closeReplacementForm={toggleEditForm}
    replacement={replacementToEdit}
    />
  ) : null

  const replacementForm = showNewForm ? (
    <NewReplacementContainer
    closeReplacementForm={toggleNewForm}
    />
    ) : null

  return (
    <div>
      <NavBar/>
      
      <div id='replacements'>
        <div className='search-section'>
          
          <p className='section-title'>
            Replacements Search
          </p>
          <p className='btn'
          onClick={_openNewReplacementModal}
          >
            Add New Replacement
          </p>
          <input type="text" placeholder='Search for ...' onChange={_handleUpdate}/>
          <ul className='search-results'>
            {searchResults}
          </ul>
          {replacementForm}
          {editReplacementForm}
        </div>
        
      </div>
    </div>
  )
}

const mstp = (state) => ({
  replacements: state.entities.replacements
})

const mdtp = (dispatch) => ({
  fetchReplacements: ()=>dispatch(getAllReplacements())
})

export default connect(mstp,mdtp)(withRouter(ReplacementSearch))