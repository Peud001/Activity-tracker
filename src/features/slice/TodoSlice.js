import {createSlice} from '@reduxjs/toolkit';
import {sub} from 'date-fns'

const initialState = {
    todos : [
        {id : 1, title: "cooking", timeAgo : sub(new Date(), {minute : 5}).toISOString(), description : "Afang soup", completed : false},
        {id: 2, title : 'coding',timeAgo : sub(new Date(), {minute : 10}).toISOString(), description : 'React JS', completed : false}
    ],
    toggleDisplay : false,
    invalidEntry : false
}
export const TodoSlice = createSlice({
    name : 'todos',
    initialState,
    reducers : {
        addTodo(state, action){
            const ap = action.payload
            const newTodo = {
                id : state.todos.length + 1,
                title : ap.title,
                timeAgo: new Date().toISOString(),
                description : ap.description,
                startTime : ap.startTime,
                stopTime : ap.stopTime,
                date : ap.date,
                completed : false
            }
            state.todos.push(newTodo)
        },
        toggleScreen(state){
            state.toggleDisplay = !state.toggleDisplay
        },
        toggleComplete(state, action){
            state.todos = state.todos.map((todo) => {
                if (todo.id === action.payload.id){
                    return{
                        ...todo,
                        completed : !todo.completed
                    }
                }else{
                    return todo
                }
            })
        },
        deleteTodo(state, action){
            const filteredTodo = state.todos.filter((todo) => todo.id !== action.payload.id)
            state.todos = filteredTodo
        },
        updateTodo(state, action){
            const ap = action.payload
            const editedTodo = {
                id : ap.id,
                title : ap.title,
                timeAgo : new Date().toISOString(),
                description : ap.description,
                startTime : ap.startTime,
                stopTime : ap.stopTime,
                date : ap.date,
                completed : ap.completed
            }
            const filterTodo = state.todos.filter((todo) => todo.id !== ap.id)
            state.todos = [...filterTodo, editedTodo]
        },
        invalidInput(state){
            state.invalidEntry = !state.invalidEntry
        }
    }
})
export const {
    addTodo,
    toggleScreen,
    toggleComplete,
    deleteTodo,
    updateTodo,
    invalidInput
} = TodoSlice.actions
export default TodoSlice.reducer
export const TodosState = state => state.todos.todos
export const toggleDisplayState = state => state.todos.toggleDisplay
export const invalidInputStatus = state => state.todos.invalidEntry