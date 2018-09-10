import React from 'react'
import { handleAddGoal, handleDeleteGoal } from '../actions/goals'
import { connect } from 'react-redux'
import List from './List'


class Goals extends React.Component{
    addGoal = (e) => {
        e.preventDefault()

        this.props.dispatch(handleAddGoal(
            this.input.value,
            () => this.input.value = '' 
        ))               
    }
    removeItem = (goal) => {
        this.props.dispatch(handleDeleteGoal(goal))
    }
    render(){
        return(
            <div className="col-md-6 col-sm-12">  
                <div className="thumbnail">                      
                    <h3 className="todo-h3">GOALS with react</h3>
                    <input 
                    type="text"
                    placeholder="Add a Goal"
                    ref={(input) => this.input = input} />
                    <button onClick={this.addGoal}><i className="fas fa-plus"></i></button>
                    <List 
                    items={this.props.goals}
                    remove={this.removeItem}/>
                </div>
            </div>
        )
    }
}

export default connect((state) => ({
    goals : state.goals
}))(Goals)