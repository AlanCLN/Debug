import { connect } from "react-redux"
import SessionForm from "./SessionForm"
import { clearErrors, signup } from "../../action/session"



const mstp = (state)=>({
  formType: 'signup',
  errors: state.errors.session_errors
})

const mdtp = (dispatch)=>({
  submitForm: user=>dispatch(signup(user)),
  clearErrors: ()=>dispatch(clearErrors())
})

export default connect(mstp,mdtp)(SessionForm)