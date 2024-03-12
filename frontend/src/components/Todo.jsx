import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import { actionCreators } from "../TodoRedux/Actions.jsx";
import axios from "axios";
import TodoItem from "./TodoItem.jsx";

import {
  editTodo,
  deleteTodo,
  studyCompleted,
  resetState,
  todoText,
  camStart,
} from "../TodoRedux/Actions.jsx";

//아이콘
import { FaCheck } from "react-icons/fa";
import { RiCalendarTodoFill } from "react-icons/ri";
import { RxLapTimer } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import todoItem from "./TodoItem.jsx";

const Todo = ({ study, isLoading, setStudy, setStream, stream }) => {
  const [editText, setEditText] = useState({
    study_todo: "",
  });
  //dispatch:action으로 reducer가 새로운 상태(modify)로 된 걸 렌더링하게 도와주는 역할
  const dispatch = useDispatch();
  const [selectedItemId, setSelectedItemId] = useState(null);
  //리덕스 상태 가져오기
  const todoItem = useSelector((state) => state.todoItem);
  //삭제
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/study/${id}/`);
      dispatch(deleteTodo(id));
    } catch (error) {
      console.log(error);
    }
  };
  //편집
  const handleEdit = async (id) => {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/study/${id}/`,
        { study_todo: editText.study_todo },
      );
      console.log(response.data);
      // const newStudy = study.map((ele) =>
      //   ele.id === id ? response.data : ele,
      // );
      // setStudy(newStudy);
      dispatch(editTodo(id, { study_todo: editText.study_todo }));
    } catch (error) {
      console.log(error);
    }
  };

  //todo편집 함수
  const handleChange = (e) => {
    const updatedValue = e.target.value;
    setEditText({ ...editText, study_todo: updatedValue });
  };

  //edit버튼 클릭 버튼
  const handleClick = () => {
    handleEdit(editText.id);
    todoText(editText.id, editText.study_todo);
    setEditText({ study_todo: "" });
  };

  //공부 진도 상태
  const handleCheckbox = (id, study_completed) => {
    dispatch(studyCompleted(todoItem.id, todoItem.study_completed));
    console.log(study_completed);
    console.log(id);
  };

  // 공부 시작을 위한 라디오버튼 활성화 함수
  const handleRadioChange = (itemId) => {
    setSelectedItemId(itemId);
    resetState(itemId);
    dispatch(camStart(itemId));
  };

  // 선택된 항목 초기화
  const handleReset = () => {
    setSelectedItemId(null);
    resetState(false);
  };

  // 선택된 항목의 데이터를 가져오는 함수
  const getSelectedItemData = () => {
    if (!selectedItemId) return null;

    return study.find((item) => item.id === selectedItemId);
  };

  const selectedItemData = getSelectedItemData(); // 선택된 항목의 데이터

  return (
    <div>
      {selectedItemData && (
        <div>
          <h2>선택된 항목 데이터:</h2>
          <p>ID: {selectedItemData.id}</p>
          <p>Name: {selectedItemData.study_todo}</p>
          {/* 다른 데이터 필드들을 여기에 추가 */}
        </div>
      )}
      <table className="w-11/12 max-w-4xl">
        <thead className="border-b-2 border-black">
          <tr>
            <th className="p-3 text-sm font-semibold tracking-wide text-left items-center">
              <div className="flex items-center font-sm">
                <FaCheck />
                Progress
              </div>
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide items-center">
              <div className="flex items-center">
                <RiCalendarTodoFill />
                ToDo
              </div>
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide  items-center">
              <div className="flex items-center">
                <RxLapTimer className="text-sm" />
                Study Time
              </div>
            </th>

            <th className="p-3 text-sm font-semibold tracking-wide  items-center">
              <span className="flex items-center">
                <FaRegEdit className="text-sm" />
                Edit
                <MdDelete className="ml-2" />
                Delete
              </span>
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-right items-center">
              <div className="flex items-center">
                <GrPowerReset />
                <button onClick={handleReset}>Reset</button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="3">Is Loading</td>
            </tr>
          ) : !study || study.length === 0 ? (
            <tr>
              <td colSpan="5"></td>
            </tr>
          ) : (
            <>
              {/*Table 컴포넌트 내부에서 TodoItem 컴포넌트 사용*/}
              {study.map((todoItem, index) => (
                <TodoItem
                  key={index}
                  todoItem={todoItem}
                  handleCheckbox={handleCheckbox}
                  handleDelete={handleDelete}
                  setEditText={setEditText}
                  setStream={setStream}
                  stream={stream}
                  selectedItemId={selectedItemId}
                  onRadioChange={handleRadioChange}
                />
              ))}
            </>
          )}
        </tbody>
      </table>

      {/* Modal */}
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Edit Todo</h3>
          <input
            type="text"
            value={editText.study_todo}
            onChange={handleChange}
            placeholder="Type here"
            className="input input-bordered w-full mt-8"
          />
          <div className="modal-action">
            <label
              htmlFor="my-modal"
              onClick={handleClick}
              className="btn btn-primary"
            >
              Edit
            </label>
            <label htmlFor="my-modal" className="btn">
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

// mapStateToProps 함수 정의
const mapStateToProps = (state) => ({
  todoItems: state.todoItem,
});

function mapDispatchToProps(dispatch) {
  return {
    studyCompleted: (id, study_completed) =>
      dispatch(actionCreators.studyCompleted(id, study_completed)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
