import { connect } from "react-redux"
import { clearCardErrors, deleteCard, updateCard } from "../../action/card"
import CardForm from "./CardForm"


const mstp = (state,ownProps) => ({
  formType: 'edit',
  cardName: ownProps.card.name,
  cardCategory: ownProps.card.category,
  cardId: ownProps.card.id,
  errors: state.errors.card_errors
})

const mdtp = (dispatch,ownProps) => ({
  submitCardData: (card)=>dispatch(updateCard(card)),
  deleteCard: (card)=>dispatch(deleteCard(card)),
  closeForm: ownProps.closeForm,
  clearErrors: ()=>dispatch(clearCardErrors())
})

export default connect(mstp,mdtp)(CardForm)