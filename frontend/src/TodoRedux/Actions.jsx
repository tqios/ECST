//<action으로 정의할 요소들>
// 공부 완료/미완료 상태

export const STUDY_COMPLETED = "STUDY_COMPLETED";
//할 일 수정
export const EDIT_TODO = "EDIT_TODO";

//할 일 삭제
export const DELETE_TODO = "DELETE_TODO";
//공부 중인지 아닌지 상태
export const STUDY_STATE = "STUDY_STATE";
//Todo
export const TODO_TEXT = "TODO_TEXT";
//reset 상태
export const RESET_STATE = "RESET_STATE";
//캠 카메라 상태
export const CAM_START = "CAM_START";

//<action 정의>
export const studyCompleted = (id, study_completed) => ({
  type: STUDY_COMPLETED,
  payload: { id, study_completed },
});

export const editTodo = (id, editText) => ({
  type: EDIT_TODO,
  payload: { id, editText },
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: { id },
});

export const studyState = (id) => ({
  type: STUDY_STATE,
  payload: { id },
});

export const todoText = (id, study_todo) => ({
  type: TODO_TEXT,
  payload: { id, study_todo },
});

export const resetState = (id) => ({
  type: RESET_STATE,
  payload: { id },
});

export const camStart = (id) => ({
  type: CAM_START,
  payload: { id },
});

export const actionCreators = {
  studyCompleted,
};
