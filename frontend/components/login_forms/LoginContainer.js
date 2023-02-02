import { connect } from "react-redux"
import SessionForm from "./SessionForm"
import { clearErrors, login } from "../../action/session"



const mstp = (state)=>({
  formType: 'login',
  errors: state.errors.session_errors
})

const mdtp = (dispatch)=>({
  submitForm: user=>dispatch(login(user)),
  clearErrors: ()=>dispatch(clearErrors())
})

export default connect(mstp,mdtp)(SessionForm)