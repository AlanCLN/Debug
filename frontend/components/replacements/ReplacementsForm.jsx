import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

const ReplacementsForm = (props) => {

  const [find,updateFind] = useState(props.find)
  const [replace,updateReplace] = useState(props.replace)

  useEffect(()=>()=>props.clearErrors(),[])

  function _handleSubmit(e){
    e.preventDefault()
    const replacement = {find: find.toLowerCase(),replace: replace.toLowerCase()}
    if(props.formType === 'edit'){
      replacement.id = props.id
    }
    props.submitReplacementData(replacement)
  }

  function _handleUpdate(field){
    return (e)=>{
      if(field === 'find'){
        updateFind(e.target.value)
      } else {
        updateReplace(e.target.value)
      }
    }
  }

  function _handleDelete(){
    props.deleteReplacement({id: props.id})
  }

  function _handleClose(){
    props.closeWindow(false)
  }

  const formType = props.formType === 'new' ? 'New' : 'Edit'
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
        <p className="form-title">{formType} Replacement</p>
        {errorsText}
        <div className="form-input">
          <input type="text" placeholder="Find" onChange={_handleUpdate('find')} value={find}/>
          <input type="text" placeholder="Replace" onChange={_handleUpdate('replace')} value={replace}/>
        </div>
        <div className="form-btns">
          {deleteButton}
          <p
          onClick={_handleSubmit}
          className='btn form-btn'
          >
            {props.formType === 'new' ? 'Add' : 'Update'}
          </p>
          <p
          onClick={_handleClose}
          className='btn form-btn'
          >
            Close
          </p>
        </div>
      </div>
    </div>
  )
}

export default withRouter(ReplacementsForm)