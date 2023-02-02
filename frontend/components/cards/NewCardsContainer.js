import CardForm from "./CardForm";
import { connect } from "react-redux";
import { addNewCard, clearCardErrors } from "../../action/card";

const mstp = (state) => ({
  cardName: '',
  cardCategory: '',
  formType: 'new',
  errors: state.errors.card_errors
})

const mdtp = (dispatch,ownProps) => ({
  submitCardData: card => dispatch(addNewCard(card)),
  closeForm: ownProps.closeForm,
  clearErrors: ()=>dispatch(clearCardErrors())
})

export default connect(mstp,mdtp)(CardForm)