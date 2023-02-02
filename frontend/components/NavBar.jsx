import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../action/session";

const NavBar = props => {

    function _handleLogout(){
      props.logoutUser()
    }

    return (
        <div className='nav-bar'>

            <Link
            to='/home'
            className="nav-btn"
            >
                Home
            </Link>

            <Link
            to='/replacements'
            className='nav-btn'
            >
                Replacements
            </Link>

            <Link 
            to='/cards'
            className='nav-btn'
            >
                Cards
            </Link>

            <Link
            to='/settings'
            className='nav-btn'
            >
                Settings
            </Link>
            
            <p
            onClick={_handleLogout}
            className='nav-btn'
            >
                Logout
            </p>

        </div>
    )
}
const mstp = state => ({

})

const mdtp = (dispatch) => ({
    logoutUser: ()=>dispatch(logout())
  })

export default connect(mstp,mdtp)(NavBar)