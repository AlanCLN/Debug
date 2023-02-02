import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updateUser } from "../../action/session";
import { fetchSettings, updateSettings } from "../../action/setting";
import NavBar from "../NavBar";

const Settings = ({settings,fetchSettings,updateSettings,submitUser, errors}) => {

    useEffect(fetchSettings,[])
    const [trackingInput,updateTrackingInput] = useState(settings.tracking?.value)
    const [currentPassword,updateCurrentPassword] = useState('')
    const [newPassword, updateNewPassword] = useState('')
    const [confirmPassword, updateConfirmPassword] = useState('')

    function _updatePassword(type){
        return e => {
            if(type==='current'){
                updateCurrentPassword(e.target.value)
            } else if(type==='new'){
                updateNewPassword(e.target.value)
            } else {
                updateConfirmPassword(e.target.value)
            }
        }
    }

    function _submitPassword(e){
        e.preventDefault()
        submitUser({password: currentPassword, newPassword,confirmPassword})
    }

    function _handleTrackingChange(e){
        updateTrackingInput(e.target.value)
    }

    function _updateSettings(){
        updateSettings({setting: 'tracking',value: trackingInput, id: settings.tracking.id})
    }

    const errorsText = errors?.length === 0 ? null : (
        <ul className='errors'>
          {errors?.map(error=><li>{error}</li>)}
        </ul>
      )

    return (
        <div>
            <NavBar/>

            <div className="search-section">
                <p className="section-title">
                    Settings
                </p>
                {errorsText}
                <form id="password-form">
                    <p>Change Password</p>
                    <input type='password' placeholder="Current Password" onChange={_updatePassword('current')}/>
                    <input type="password" placeholder="New Password" onChange={_updatePassword('new')}/>
                    <input type="password" placeholder="Confirm New Password" onChange={_updatePassword('confirm')}/>
                    <button
                    onClick={_submitPassword}
                    >
                        Save Password
                    </button>
                </form>

                <form id='tracking-form'>
                    <p>Change Untracked Order Maximum</p>
                    <input type="text" placeholder={settings.tracking?.value} onChange={_handleTrackingChange}/>
                    <button onClick={_updateSettings}>Update</button>
                </form>
            </div>
        </div>
    )
}

const mstp = state => ({
    settings: state.settings,
    errors: state.errors.session_errors
})

const mdtp = dispatch => ({
    fetchSettings: ()=>dispatch(fetchSettings()),
    updateSettings: settings=>dispatch(updateSettings(settings)),
    submitUser: user => dispatch(updateUser(user))
})

export default connect(mstp,mdtp)(Settings)