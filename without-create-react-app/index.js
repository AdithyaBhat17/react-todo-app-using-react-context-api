

//This is the application code
//constants
const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'
const RECEIVE_DATA = 'RECEIVE_DATA'

//actions
function addTodoAction (todo) {
    return {
      type: ADD_TODO,
      todo,
    }
  }
  function removeTodoAction (id) {
    return {
      type: REMOVE_TODO,
      id,
    }
  }
  function toggleTodoAction (id) {
    return {
      type: TOGGLE_TODO,
      id,
    }
  }
  function addGoalAction (goal) {
    return {
      type: ADD_GOAL,
      goal,
    }
  }
  function removeGoalAction (id) {
    return {
      type: REMOVE_GOAL,
      id,
    }
  }
  function receiveDataAction(todos, goals){
      return{
          type:RECEIVE_DATA,
          todos,
          goals
      }
  }

//Reducer function
function todos(state = [], action){
    switch(action.type){
        case ADD_TODO :
            return state.concat(action.todo)
        case REMOVE_TODO :
            return state.filter((todo) => todo.id != action.id)
        case TOGGLE_TODO :
            return state.map((todo) => todo.id !== action.id ? todo : Object.assign({},todo,{complete: !todo.complete}))
        case RECEIVE_DATA : 
            return action.todos
        default :
            return state
    }   
}

function goals(state = [],action){
    switch(action.type){
        case ADD_GOAL :
            return state.concat(action.goal)
        case REMOVE_GOAL :
            return state.filter((goal) => goal.id != action.id)
        case RECEIVE_DATA : 
            return action.goals
        default : 
            return state
    }
}

function loading(state = true,action){
    switch(action.type){
        case RECEIVE_DATA : 
            return false
        default :
            return state
    }
}


function generateId(){
    return Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
}

function addTodo(){
    const input = document.getElementById('todo')
    const name = input.value
    input.value = ''

    store.dispatch(addTodoAction({
        name,
        complete:false,
        id: generateId()
    }))
}

function addGoal(){
    const input = document.getElementById('goal')
    const name = input.value
    input.value = ''

    store.dispatch(addGoalAction({
        id: generateId(),
        name        
    }))
}

function handleInitialData(){
    return (dispatch) => {
        return Promise.all([
            API.fetchTodos(),
            API.fetchGoals()
        ])
        .then(([todos, goals]) => {
            dispatch(receiveDataAction(todos, goals))
        })
    }
}

function handleAddTodo(name,callback){
    return (dispatch) => {
        return API.saveTodo(name)
            .then((todo) => {
                dispatch(addTodoAction(todo))
                callback()
            })
            .catch(() => {
                alert('error occured')
                callback()
            })
    }
}

function handleToggleTodo(id){
    return dispatch => {
        dispatch(toggleTodoAction(id))
        return API.saveTodoToggle(id)
            .catch(() => {
                dispatch(toggleTodoAction(id))
                alert('an error occured')
            })
    }
}

function handleAddGoal(name,callback){
    return (dispatch) => {
        return API.saveGoal(name)
            .then((goal) => {
                dispatch(addGoalAction(goal))
                callback()
            })
            .catch(() => {
                alert('error occured')
                callback()
            })
    }
}

function handleDeleteTodo(todo){
    return (dispatch) => {
        dispatch(removeTodoAction(todo.id))
        return API.deleteTodo(todo.id)
            .catch(() => {
            this.props.store.dispatch(addTodoAction(todo))
        })
    }
}

function handleDeleteGoal(goal){
    return(dispatch) => {
        dispatch(removeGoalAction(goal.id))
        return API.deleteGoal(goal.id)
            .catch(() => {
            this.props.store.dispatch(addGoalAction(goal))
        })
    }
}

function checker(store){
    return function(next){
        return function(action){
            if(
                action.type === ADD_TODO &&
                action.todo.name.toLowerCase().includes('bitcoin')
            ){
                return alert('Ohh noo! Don\'t do it boii' )
            }
            if(
                action.type === ADD_GOAL &&
                action.goal.name.toLowerCase().includes('bitcoin')
            ){
                return alert('Ohh noo! Don\'t do it boii' )
            }
            return next(action) //next middleware in line or store.dispatch
        }
    }
}

//logger middleware to log action before it dispatches/invokes a reducer function, and the new state.
//ES6 arrow function(similar to checker())
const logger = (store) => (next) => (action) => {
    console.group(action.type)
        console.log('The action is : ',action)
        const result = next(action)
        console.log('The new state is : ',store.getState())
    console.groupEnd()
    return result
}

//create store combining the reducers.

const store = Redux.createStore(Redux.combineReducers({
    todos,goals,loading
}),Redux.applyMiddleware(ReduxThunk.default,checker,logger))


  

  