import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  todo: "sdf",
}

export const currTodo = createSlice({
  name: 'todoMutator',
  initialState: {
    value: "없습니다!",
    isStudy: false,
  },
  reducers: {
    studyStart: (state) => {
      state.isStudy = true
    },
    studyStop: (state) => {
      state.isStudy = false
    },
    todoElementMutator: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { studyStart, studyStop, todoElementMutator } = currTodo.actions

export default currTodo.reducer