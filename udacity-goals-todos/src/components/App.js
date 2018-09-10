import React from 'react';
import { connect } from 'react-redux'
import ConnectedGoals from './Goals'
import ConnectedTodo from './Todos'
import { handleInitialData } from '../actions/shared'

class App extends React.Component{
  componentDidMount(){
      const {dispatch} = this.props
      dispatch(handleInitialData())
  }
  render(){

      if(this.props.loading){
          return <h3 style={{textAlign:`center`}}>loading</h3>
      }

      return(
          <div className="container">
              <div className="row">
                  <ConnectedTodo/>
                  <ConnectedGoals/>
              </div>
          </div>
      )
  }
}

export default connect((state) => ({
  loading : state.loading
}))(App)
