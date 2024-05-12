import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice.jsx'
import currTodoReducer from './currTodo.jsx';
export const Store = configureStore({
  reducer: {
    counter : counterReducer,
    todoModifier : currTodoReducer,
  },
})