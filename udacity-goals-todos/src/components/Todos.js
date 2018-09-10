import React from 'react'
import { handleAddTodo, handleDeleteTodo, handleToggleTodo } from '../actions/todos'
import { connect } from 'react-redux'
import List from './List'

class Todos extends React.Component{
    addItem = (e) => {
        e.preventDefault()
        
        this.props.dispatch(handleAddTodo(
            this.input.value,
            () => this.input.value = '' 
        ))   
    }

    removeItem = (todo) => {
        this.props.dispatch(handleDeleteTodo(todo))
    }

    toggleItem = (id) => {
        this.props.dispatch(handleToggleTodo(id))
    }

    render(){
        return(
            <div className="col-md-6 col-sm-12">                        
                <div className="thumbnail">
                    <h3 className="todo-h3">TODO with react</h3>
                    <input 
                    type="text"
                    placeholder="Add a task"
                    ref={(input) => this.input = input} />
                    <button onClick={this.addItem}><i className="fas fa-plus"></i></button>
                    <List 
                    toggle={this.toggleItem}
                    items={this.props.todos}
                    remove={this.removeItem}/>
                </div>
            </div>
        )
    }
}

export default connect((state) =>({
    todos : state.todos
}))(Todos)
