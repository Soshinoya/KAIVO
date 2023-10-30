import { combineReducers, legacy_createStore } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension'

import { todosReducer } from './reducers/todosReducer'

// Объединение reducers
// const rootReducer = combineReducers({
//     cashReducer
// })

// Методы store:
// 1 Получить состояние (getState)
// 2 Изменить состояние (с помощью dispatch)
// 3 Подписаться на изменения состояния
export const store = legacy_createStore(todosReducer, composeWithDevTools())