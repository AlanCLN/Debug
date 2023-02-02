import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { clearErrors, updateUser } from '../../action/session'

const SessionForm = ({formType,errors,submitForm,history,clearErrors}) => {

  const [username,updateUsername] = useState('')
  const [password,updatePassword] = useState('')

  useEffect(()=>()=>clearErrors(),[])

  function _handleBackToSplash(){
    history.push('/')
  }

  function _handleSubmit(e){
    e.preventDefault()
    submitForm({username: username,password: password})
  }

  function _handleUpdate(type){
    return (e)=>{
      if (type === 'username'){
        updateUsername(e.target.value)
      } else {
        updatePassword(e.target.value)
      }
    }
  }

  const changeForm = formType === 'login' ? <Link to='/signup'> Signup </Link> : <Link to='/login'>Login</Link>

  const submitButton = formType === 'login' ? 'Log In' : 'Signup'

  const changeFormText = formType === 'login' ? `Don't have an account? ` : `Already have an account? `

  const errorsText = errors?.length === 0 ? null : (
    <ul className='errors'>
      {errors?.map(error=><li>{error}</li>)}
    </ul>
  )

  return (
    
    <div id='session-form'>
      <img src={window.gcLogo} className='gamers-choice-logo'/>
      <div id='login-modal'>
        {errorsText}
        <form className='inputs'>
          <input
          type='text'
          placeholder='Username'
          onChange={_handleUpdate('username')}
          />
          <input
          type='password'
          placeholder='Password'
          onChange={_handleUpdate('password')}
          />
          <button
          onClick={_handleSubmit}
          >
            {submitButton}
          </button>
        </form>
        
        <p
        onClick={_handleBackToSplash}
        className='btn'
        >
          Back to splash
        </p>
        {changeFormText}
        {changeForm}
      </div>
    </div>
  )
}

export default SessionForm