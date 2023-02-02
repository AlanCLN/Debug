import { connect } from "react-redux";
import { clearReplacementErrors, deleteReplacement, updateReplacement } from "../../action/replacement";
import ReplacementsForm from "./ReplacementsForm";

const mstp = (state,ownProps) => ({
  find: ownProps.replacement.find,
  replace: ownProps.replacement.replace,
  id: ownProps.replacement.id,
  formType: 'edit',
  errors: state.errors.replacement_errors

})

const mdtp = (dispatch,ownProps) => ({
  submitReplacementData: replacement => dispatch(updateReplacement(replacement)),
  closeWindow: ownProps.closeReplacementForm,
  deleteReplacement: replacement=>dispatch(deleteReplacement(replacement)),
  clearErrors: ()=>dispatch(clearReplacementErrors())
})

export default connect(mstp,mdtp)(ReplacementsForm)