import { createStore } from "redux";
import {
  STUDY_COMPLETED,
  EDIT_TODO,
  DELETE_TODO,
  STUDY_STATE,
  TODO_TEXT,
  RESET_STATE,
  CAM_START
} from "../TodoRedux/Actions.jsx";
import todoItem from "../components/TodoItem.jsx";
import { useSelector } from "react-redux";

const initialState = {
  stream: null,
  study: false,
  radioStart: false,
  todoItem: [],
  editText: {
    study_todo: "",
  },
  study_completed: false,
};

//Reducer: 데이터(state)를 modify
const Reducer = (state = initialState, action) => {
  switch (action.type) {
    //payload:action에 담겨진 실제 데이터

    //공부 상태
    case STUDY_STATE:
      return {
        ...state,
        study: !action.payload.study,
      };
    //Progress
    case STUDY_COMPLETED:
      return {
        ...state,
        todoItem: state.todoItem.map((todo) => {
          if (todo.id === action.payload.id) {
            return {
              ...todo,
              study_completed: !action.payload.study_completed,
            };
          }
          return todo;
        }),
      };

    //Todo
    case TODO_TEXT:
      return {
        ...state,
        todoItem: state.todoItem.map((todo) => {
          if (todo.id === action.payload.id) {
            return { ...todo, text: action.payload.text };
          }
          return todo;
        }),
      };
    //Edit
    case EDIT_TODO:
      return {
        ...state,
        todoItem: state.todoItem.map((todo) => {
          if (todo.id === action.payload.id) {
            return { ...todo, editText: action.payload.editText };
          }
          return todo;
        }),
      };

    //Delete
    case DELETE_TODO:
      return {
        ...state,
        todoItem: state.todoItem.filter((todo) => todo.id !== action.payload),
      };

    //리셋버튼
    case RESET_STATE:
      return {
        ...state,
        radioStart: !action.payload.radioStart,
      };
    //캠 카메라
    case CAM_START:
      return {
        ...state,
        stream: !action.payload.stream,
      };
    default:
      return state;
  }
};

//데이터 저장소
const Store = createStore(Reducer);

export default Store;
