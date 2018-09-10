import { ADD_TODO } from '../actions/todos'
import { ADD_GOAL } from '../actions/goals'

export default function checker(store){
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