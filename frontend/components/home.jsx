import React from 'react'
import { withRouter } from 'react-router'

class Home extends React.Component {

  componentDidMount(){
    this.props.history.push('/login')
  }

  render(){
    return(
      <div>Loading</div>
    )
  }
}

export default withRouter(Home)