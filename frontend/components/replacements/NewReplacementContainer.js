import ReplacementsForm from "./ReplacementsForm"
import { connect } from "react-redux";
import { addNewReplacement, clearReplacementErrors } from "../../action/replacement";

const mstp = (state) => ({
  find: '',
  replace: '',
  formType: 'new',
  errors: state.errors.replacement_errors
})

const mdtp = (dispatch,ownProps) => ({
  submitReplacementData: replacement => dispatch(addNewReplacement(replacement)),
  closeWindow: ownProps.closeReplacementForm,
  clearErrors: ()=>dispatch(clearReplacementErrors())
})

export default connect(mstp,mdtp)(ReplacementsForm)