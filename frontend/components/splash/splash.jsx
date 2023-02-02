import React from 'react'
import {connect} from 'react-redux'

const Splash = (props) => {
  function _handleClick(){
    props.history.push('/login')
  }
  return (
    <div id='splash'>

      <div className='nav-bar'>
        <p
        className='nav-btn'
        >
          Splash Page
        </p>

        <p
        onClick={_handleClick}
        className='nav-btn'
        >
          Login
        </p>

      </div>

      <div id='splash-center'>
        <img src={window.logo} className='infected-mail-icon'/>
        <p id='by'> BY </p>
        <img src={window.gcLogo} className='gamer-choice-logo' />
      </div>
    </div>
  )
}


export default Splash