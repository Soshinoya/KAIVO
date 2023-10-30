import initalState from '../initialState'

import { ADD_TODO } from '../actions/userActions'

// reducer - функция, принимающая state и action
export const todosReducer = (state = initalState, action) => {
    switch (action.type) {
        case ADD_TODO:
            return { ...state, todos: [...state.todos, action.payload] }

        default:
            return state
    }
}