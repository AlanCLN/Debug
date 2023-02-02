import React from 'react'
import {Switch} from 'react-router'
import Splash from '../components/splash/splash'
import { AuthRoute, ProtectedRoute } from '../util/route_util'
import CardSearch from './cards/CardSearch'
import Homepage from './homepage/homepage'
import LoginContainer from './login_forms/LoginContainer'
import SignupContainer from './login_forms/SignupContainer'
import ReplacementSearch from './replacements/ReplacementSearch'
import Settings from './settings/Settings'

const App = () => (
  <>

    <div id='app-body'>
      <Switch>
        <ProtectedRoute exact path='/home' component={Homepage}/>
        <AuthRoute exact path='/login' component={LoginContainer}/>
        <AuthRoute exact path='/' component={Splash}/>
        <AuthRoute exact path='/signup' component={SignupContainer}/>
        <ProtectedRoute exact path='/replacements' component={ReplacementSearch}/>
        <ProtectedRoute exact path='/cards' component={CardSearch}/>
        <ProtectedRoute exact path='/settings' component={Settings}/>
      </Switch>
    </div>
  </>
)

export default App